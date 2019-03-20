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

import ToggleThroughStates from './ToggleThroughStates';

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
					<ToggleThroughStates>
						{[
							(
								<>
								<CountDown
									key={10}
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
								<SubtitleCenterText key={11}>
									{translate.endEventName[period]}
								</SubtitleCenterText>
								</>
							),
							(
								<>
								<SubtitleCenterText key={20}>
									{translate.startEventName[period]}
								</SubtitleCenterText>
								<SubtitleCenterText key={21}>
									{countDownTo.toLocaleString({
										month: 'short',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</SubtitleCenterText>
								</>
							),
						]}
					</ToggleThroughStates>
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
