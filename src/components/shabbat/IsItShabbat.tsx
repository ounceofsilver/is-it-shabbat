import i18n from 'i18n-js';
import { action, components, utilities } from 'is-it-shabbat-core';
import { DateTime } from 'luxon';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { SubtitleCenterText, TitleCenterText } from '../../Styles';
import { ILocation } from '../location/types';
import ToggleThroughStates from '../ToggleThroughStates';

const { ShabbatCheck, CountDown } = components;
const { underAWeek } = utilities;

const IsItShabbat = ({ now, location, dispatch }: {
	now: DateTime,
	location: ILocation,
	dispatch: (DateTime) => void,
}) => (
	<ShabbatCheck now={now} location={location}>
		{(period, countDownTo) => (
			<View>
				<TitleCenterText>
					{i18n.t(`status.${period}`)}
				</TitleCenterText>
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
									<SubtitleCenterText>
										{i18n.t(
											`endEventName.${period}`,
											{ duration: underAWeek(dur) },
										)}
									</SubtitleCenterText>
								)}
							</CountDown>
						),
						(
							<SubtitleCenterText key={20}>
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
							</SubtitleCenterText>
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
)(IsItShabbat);
