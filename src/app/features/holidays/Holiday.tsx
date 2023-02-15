import React from 'react';

import { IHoliday } from '../../../core/store/holiday';
import { CenteredContainer, HolidaySubtitleText, HolidayTitleText } from '../../elements/styles';
import { useTime } from '../../time';
import ToggleThroughStates from '../ToggleThroughStates';
import { formatHolidayDuration } from './utilities/durationFormatter';

interface IHolidayProps {
	holiday: IHoliday;
	key?: any;
}

export const Holiday = ({
	holiday: { title, date, hdate },
}: IHolidayProps) => {
	const now = useTime(100);

	// If date is in the past, don't show it anymore
	const diff = date.diff(now);
	if (diff.shiftTo('milliseconds').milliseconds <= 0) {
		return null;
	}

	return (
		<CenteredContainer>
			<HolidayTitleText>
				{title}
			</HolidayTitleText>
			<ToggleThroughStates>
				{[
					(
						<HolidaySubtitleText key={1}>
							{formatHolidayDuration(diff)}
						</HolidaySubtitleText>
					),
					(
						<HolidaySubtitleText key={2}>
							{date.toLocaleString({
								day: '2-digit',
								month: 'short',
								hour: '2-digit',
								minute: '2-digit',
								weekday: 'short',
							})}
						</HolidaySubtitleText>
					),
					(
						<HolidaySubtitleText key={3}>
							{hdate}
						</HolidaySubtitleText>
					),
				]}
			</ToggleThroughStates>
		</CenteredContainer>
	);

};
