import React from 'react';

import { IHoliday } from '../../../core/models/holidays';
import { formatHolidayDuration } from '../../../core/utilities/durationFormatter';
import { CenteredContainer, HolidaySubtitleText, HolidayTitleText } from '../../Styles';
import { useTime } from '../../time';
import ToggleThroughStates from '../ToggleThroughStates';

interface IHolidayProps {
	holiday: IHoliday;
	key?: any;
}

export const Holiday = ({
	holiday: { title, date },
}: IHolidayProps) => {
	const now = useTime(100);

	// If date is in the past, don't show it anymore
	const diff = date.diff(now);
	if (diff.shiftTo('milliseconds').milliseconds <= 0) {
		return null;
	}

	return (
		<CenteredContainer style={{ marginBottom: 15 }}>
			<HolidayTitleText>
				{/* TODO: Localize holiday titles */}
				{title.replace('Rosh Chodesh ', '')}
			</HolidayTitleText>
			<ToggleThroughStates>
				{[
					(
						<HolidaySubtitleText key={1}>
							{/* TODO: localize durations */}
							{formatHolidayDuration(diff)}
						</HolidaySubtitleText>
					),
					(
						<HolidaySubtitleText key={2}>
							{date.toLocaleString({
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit',
								month: 'short',
								weekday: 'short',
							})}
						</HolidaySubtitleText>
					),
				]}
			</ToggleThroughStates>
		</CenteredContainer>
	);

};
