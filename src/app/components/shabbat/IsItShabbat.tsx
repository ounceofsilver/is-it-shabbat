import i18n from 'i18n-js';
import { DateTime } from 'luxon';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getShabbatState } from '../../../core/store/get';
import { underAWeek } from '../../../core/utilities/durationFormatter';

import { ShabbatSubtitleText, ShabbatText } from '../../Styles';
import { useTime } from '../../time';
import ToggleThroughStates from '../ToggleThroughStates';

export const PureIsItShabbat = ({
	shabbat,
}: {
	shabbat: { period: string, countDownTo: DateTime },
}) => {
	if (!shabbat) { return null; }
	const { period, countDownTo } = shabbat;
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
	state => ({
		shabbat: getShabbatState(state),
	}),
)(PureIsItShabbat);
