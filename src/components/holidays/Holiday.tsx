import { components, utilities } from 'is-it-shabbat-core';
import { DateTime, Duration } from 'luxon';
import React from 'react';

import { CenteredContainer, HolidaySubtitleText, HolidayTitleText } from '../../Styles';
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
		<HolidayTitleText>
			{title.replace('Rosh Chodesh ', '')}
		</HolidayTitleText>
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
							<HolidaySubtitleText>
								{formatHolidayDuration(dur)}
							</HolidaySubtitleText>
						)}
					</CountDown>
				),
				(
					<HolidaySubtitleText key={2}>
						{date.toLocaleString({
							day: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
							month: 'short',
							weekday: 'long',
						})}
					</HolidaySubtitleText>
				),
			]}
		</ToggleThroughStates>
	</CenteredContainer>
);
