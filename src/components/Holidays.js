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

import ToggleThroughStates from './ToggleThroughStates';
import {
	SubtitleText,
	SecondaryText,
} from '../Styles';
import filterHolidays from '../utilities/holidayFiltering';

const { CountDown } = components;
const { DateTime, formatHolidayDuration } = utilities;


const Holidays = ({ holidays, now, dispatch }) => (
	filterHolidays(holidays, now)
		.map(
			holiday => (
				<View key={holiday.date.toString()} style={{ marginBottom: 15 }}>
					<SecondaryText>
						{holiday.title}
					</SecondaryText>
					<ToggleThroughStates>
						{[
							(
								<CountDown
									key={1}
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
							),
							(
								<SubtitleText
									key={2}
									style={{ paddingLeft: 15 }}
								>
									{holiday.date.toLocaleString({
										weekday: 'long',
										month: 'short',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</SubtitleText>
							),
						]}
					</ToggleThroughStates>
				</View>
			),
		)
);

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
