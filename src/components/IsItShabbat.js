import React from 'react';
import {
	View,
} from 'react-native';
import PropTypes from 'prop-types';

import {
	localization,
	components,
	state,
	utilities,
} from 'is-it-shabbat-core';

import {
	TitleCenterText,
	SubtitleCenterText,
} from '../Styles';

import {
	underAWeek,
} from '../utilities/durationFormatter';

const { ShabbatCheck, CountDown } = components;
const { en: { translate: { status, endEventName } } } = localization;
const { spacetime } = state;
const { DateTime } = utilities;


export default function IsItShabbat(props) {
	const { now, location } = props;
	return (
		<ShabbatCheck now={now} location={location}>
			{(period, countDownTo) => (
				<View>
					<TitleCenterText>
						{`${status[period]}`}
					</TitleCenterText>
					<CountDown
						end={countDownTo}
						start={now}
						callback={spacetime.action.setNow}
					>
						{dur => (
							<SubtitleCenterText>
								{underAWeek(dur)}
							</SubtitleCenterText>
						)}
					</CountDown>
					<SubtitleCenterText>
						{endEventName[period]}
					</SubtitleCenterText>
				</View>
			)}
		</ShabbatCheck>
	);
}
IsItShabbat.propTypes = {
	now: PropTypes.instanceOf(DateTime).isRequired,
	location: PropTypes.shape({
		coords: PropTypes.shape({
			latitude: PropTypes.number,
			longitude: PropTypes.number,
		}),
	}).isRequired,
};
