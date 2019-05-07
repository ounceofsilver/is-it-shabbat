import { components, utilities } from 'is-it-shabbat-core';
import { DateTime, Duration } from 'luxon';
import React from 'react';

import { CenteredContainer, SecondaryText, SubtitleText } from '../../Styles';
import ToggleThroughStates from '../ToggleThroughStates';
import { IHoliday } from './types';

const { CountDown } = components;
const { formatHolidayDuration } = utilities;

export const Holiday = ({
	holiday: { title, date },
	now,
	setNow,
}: {
	holiday: IHoliday,
	now: DateTime,
	setNow?: (time: DateTime) => void,
}) => (
	<CenteredContainer style={{ marginBottom: 15 }}>
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
						{(dur: Duration) => (
							<SubtitleText>
								{formatHolidayDuration(dur)}
							</SubtitleText>
						)}
					</CountDown>
				),
				(
					<SubtitleText key={2}>
						{date.toLocaleString({
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
							month: 'short',
							weekday: 'long',
						})}
					</SubtitleText>
				),
			]}
		</ToggleThroughStates>
	</CenteredContainer>
);
