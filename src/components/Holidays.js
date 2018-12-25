import React from 'react';
import PropTypes from 'prop-types';
import {
	View,
} from 'react-native';

import {
	components,
	state,
	utilities,
} from 'is-it-shabbat-core';

import {
	SubtitleText,
	SecondaryText,
} from '../Styles';

import {
	formatHolidayDuration,
} from '../utilities/durationFormatter';

const { CountDown } = components;
const { spacetime } = state;
const { DateTime } = utilities;


export default function Holidays(props) {
	const { holidays, now } = props;
	const top3futureHolidays = holidays
		.filter(h => h.date > now)
		.slice(0, 3);

	return top3futureHolidays.map(holiday => (
		<View key={holiday.date.toString()} style={{ marginBottom: 15 }}>
			<SecondaryText>
				{holiday.title}
			</SecondaryText>
			<CountDown
				end={holiday.date}
				start={now}
				callback={spacetime.action.setNow}
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
};
