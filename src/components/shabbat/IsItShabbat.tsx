import i18n from 'i18n-js';
import { action, components, utilities } from 'is-it-shabbat-core';
import { DateTime } from 'luxon';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ShabbatSubtitleText, ShabbatText } from '../../Styles';
import { ILocation } from '../location/types';
import ToggleThroughStates from '../ToggleThroughStates';

const { ShabbatCheck, CountDown } = components;
const { underAWeek } = utilities;

export const PureIsItShabbat = ({ now, location, dispatch }: {
	now: DateTime,
	location: ILocation,
	dispatch: (DateTime) => void,
}) => (
	<ShabbatCheck now={now} location={location}>
		{(period, countDownTo) => (
			<View>
				<ShabbatText>
					{i18n.t(`status.${period}`)}
				</ShabbatText>
				<ToggleThroughStates>
					{[
						(
							<CountDown
								key={10}
								end={countDownTo}
								start={now}
								callback={end => dispatch(action.setNow(end))}
							>
								{dur => (
									<ShabbatSubtitleText>
										{i18n.t(
											`endEventName.${period}`,
											{ duration: underAWeek(dur) },
										)}
									</ShabbatSubtitleText>
								)}
							</CountDown>
						),
						(
							<ShabbatSubtitleText key={20}>
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
		)}
	</ShabbatCheck>
);

export default connect(
	state => ({
		location: state.location,
		now: state.now,
	}),
)(PureIsItShabbat);
