import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
} from 'react-native';
import { connect } from 'react-redux';

import {
	components,
	action,
	utilities,
} from 'is-it-shabbat-core';

import {
	SubtitleText,
	SecondaryText,
} from '../Styles';

import {
	formatHolidayDuration,
} from '../utilities/durationFormatter';
import filterHolidays from '../utilities/holidayFiltering';

const { CountDown } = components;
const { DateTime } = utilities;


function Holidays(props) {
	const { holidays, now, dispatch } = props;

	return filterHolidays(holidays, now).map(holiday => (
		<View key={holiday.date.toString()} style={{ marginBottom: 15 }}>
			<SecondaryText>
				{holiday.title}
			</SecondaryText>
			<CountDown
				end={holiday.date}
				start={now}
				callback={end => dispatch(action.setNow(end))}
			>
				{dur => (
					<SubtitleText style={{ paddingLeft: 15 }}>
						{formatHolidayDuration(dur)}
					</SubtitleText>
				)}
			</CountDown>
		</View>
	));
}
Holidays.propTypes = {
	now: PropTypes.instanceOf(DateTime).isRequired,
	holidays: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			date: PropTypes.instanceOf(DateTime).isRequired,
		}),
	).isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default connect(
	state => ({
		now: state.now,
		holidays: state.holidays,
	}),
)(Holidays);
