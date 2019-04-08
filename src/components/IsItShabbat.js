import React from 'react';
import {
	View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import {
	components,
	action,
	utilities,
} from 'is-it-shabbat-core';

import {
	TitleCenterText,
	SubtitleCenterText,
} from '../Styles';
import ToggleThroughStates from './ToggleThroughStates';

const { ShabbatCheck, CountDown } = components;
const { DateTime, underAWeek } = utilities;

const IsItShabbat = ({ now, location, dispatch }) => (
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
											month: 'short',
											day: '2-digit',
											hour: '2-digit',
											minute: '2-digit',
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
IsItShabbat.propTypes = {
	now: PropTypes.instanceOf(DateTime).isRequired,
	location: PropTypes.shape({
		coords: PropTypes.shape({
			latitude: PropTypes.number,
			longitude: PropTypes.number,
		}),
	}).isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default connect(
	state => ({
		now: state.now,
		location: state.location,
	}),
)(IsItShabbat);
