import { components, utilities } from 'is-it-shabbat-core';
import { DateTime } from 'luxon';
import React from 'react';

import { SecondaryText, SubtitleText } from '../../Styles';
import ToggleThroughStates from '../ToggleThroughStates';
import { IHoliday } from './types';

const { CountDown } = components;
const { formatHolidayDuration } = utilities;

export const Holiday = ({
	holiday: { title, date },
	now,
	setNow = () => {},
}: {
	holiday: IHoliday,
	now: DateTime,
	setNow: (time: DateTime) => void,
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
