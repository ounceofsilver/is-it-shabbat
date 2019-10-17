import i18n from 'i18n-js';
import { DateTime } from 'luxon';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { AppState } from '../../../core/store';
import { getShabbatState } from '../../custom-selectors';
import { ShabbatSubtitleText, ShabbatText } from '../../elements/styles';
import { useTime } from '../../time';
import ToggleThroughStates from '../ToggleThroughStates';
import { underAWeek } from './utilities';

export const PureIsItShabbat = ({ state }: { state: AppState }) => {
	const shabbat = getShabbatState(state);
	if (!shabbat) { return null; }
	const { period, countDownTo }: { period: string, countDownTo: DateTime } = shabbat;
	const now = useTime(100);
	const diff = countDownTo.diff(now);

	return (
		<View>
			<ShabbatText>
				{i18n.t(`status.${period}`)}
			</ShabbatText>
			<ToggleThroughStates>
				{[
					(
						<ShabbatSubtitleText key={1}>
							{i18n.t(
								`endEventName.${period}`,
								// TODO: localize durations
								{ duration: underAWeek(diff) },
							)}
						</ShabbatSubtitleText>
					),
					(
						<ShabbatSubtitleText key={2}>
							{i18n.t(
								`startEventName.${period}`,
								{
									end: countDownTo.toLocaleString({
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
										month: 'short',
									}),
								},
							)}
						</ShabbatSubtitleText>
					),
				]}
			</ToggleThroughStates>
		</View>
	);

};

export default connect(
	state => ({ state }),
)(PureIsItShabbat);
