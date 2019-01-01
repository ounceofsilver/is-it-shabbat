import React from 'react';
import {
	View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	localization,
	components,
	action,
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
const { en: { translate } } = localization;
const { DateTime } = utilities;


function IsItShabbat(props) {
	const { now, location, dispatch } = props;
	return (
		<ShabbatCheck now={now} location={location}>
			{(period, countDownTo) => (
				<View>
					<TitleCenterText>
						{`${translate.status[period]}`}
					</TitleCenterText>
					<CountDown
						end={countDownTo}
						start={now}
						callback={end => dispatch(action.setNow(end))}
					>
						{dur => (
							<SubtitleCenterText>
								{underAWeek(dur)}
							</SubtitleCenterText>
						)}
					</CountDown>
					<SubtitleCenterText>
						{translate.endEventName[period]}
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
	dispatch: PropTypes.func.isRequired,
};

export default connect(
	state => ({
		now: state.now,
		location: state.location,
	}),
)(IsItShabbat);
