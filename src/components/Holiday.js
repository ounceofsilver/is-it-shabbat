import React from 'react';
import PropTypes from 'prop-types';

import {
	components,
	utilities,
} from 'is-it-shabbat-core';

import ToggleThroughStates from './ToggleThroughStates';
import {
	SubtitleText,
	SecondaryText,
} from '../Styles';

const { CountDown } = components;
const { DateTime, formatHolidayDuration } = utilities;

export const Holiday = ({
	holiday: { title, date }, now, setNow,
}) => (
	<>
	<SecondaryText>
		{title}
	</SecondaryText>
	<ToggleThroughStates>
		{[
			(
				<CountDown
					key={1}
					end={date}
					start={now}
					callback={setNow}
				>
					{dur => (
						<SubtitleText>
							{formatHolidayDuration(dur)}
						</SubtitleText>
					)}
				</CountDown>
			),
			(
				<SubtitleText key={2}>
					{date.toLocaleString({
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
	</>
);
export const holidayPropType = PropTypes.shape({
	title: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(DateTime).isRequired,
});
Holiday.propTypes = {
	holiday: holidayPropType,
	now: PropTypes.instanceOf(DateTime).isRequired,
	setNow: PropTypes.func,
};
Holiday.default = {
	setNow: () => {},
};
