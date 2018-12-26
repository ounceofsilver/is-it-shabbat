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
const { en: { translate: { status, endEventName } } } = localization;
const { DateTime } = utilities;


function IsItShabbat(props) {
	const { now, location, setNow } = props;
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
						callback={setNow}
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
	setNow: PropTypes.func,
};
IsItShabbat.defaultProps = {
	setNow: () => {}, // noop
};

export default connect(
	state => ({
		now: state.now,
		location: state.location,
	}),
	{ setNow: action.setNow },
)(IsItShabbat);
