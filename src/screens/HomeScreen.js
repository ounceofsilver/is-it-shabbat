import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	ScrollView,
	View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { message, endEventName } from '../constants';
import ShabbatCheck from '../components/ShabbatCheck';
import CountDown from '../components/Countdown';
import {
	colors,
	BackgroundView,
	Footer,
	CenteredContainer,

	TitleCenterText,
	SubtitleText,
} from '../Styles';
import spacetime from '../logic/SpaceTimeState';
import holidayState from '../logic/HolidayState';

export default class HomeScreen extends Component {
	componentDidMount() {
		spacetime.user.subscribe(() => {
			this.setState({});
		});
		holidayState.state.subscribe(() => {
			this.setState({});
		});
	}

	render() {
		const { navigation: { navigate } } = this.props;

		const { now, location } = spacetime.user.getState();
		const { holidays } = holidayState.state.getState();

		console.log(holidays.map(h => h.title));

		// TODO: add in Redux Provider to avoid having subscription be triggered
		// when user is on another screen and spacetime.user store is updated.
		return (
			<BackgroundView>
				<ScrollView>
					<CenteredContainer style={{ height: 400 }}>

						<ShabbatCheck now={now} location={location}>
							{(period, countDownTo) => (
								<View>
									<TitleCenterText>
										{`${message[period]}`}
									</TitleCenterText>
									<CountDown
										end={countDownTo}
										start={now}
										callback={spacetime.set.now}
									>
										{({
											days, hours, minutes, seconds,
										}) => {
											let x = `${days}d ${hours}h ${minutes}m ${seconds}s`;
											if (minutes === 0 && hours === 0 && days === 0) {
												x = `${seconds}s`;
											} else if (hours === 0 && days === 0) {
												x = `${minutes}m ${seconds}s`;
											} else if (days === 0) { //
												x = `${hours}h ${minutes}m ${seconds}s`;
											}
											return (
												<SubtitleText>
													{x}
												</SubtitleText>
											);
										}}
									</CountDown>
									<SubtitleText>
										{`until ${endEventName[period]}`}
									</SubtitleText>
								</View>
							)}
						</ShabbatCheck>

					</CenteredContainer>
				</ScrollView>

				<Footer>
					<FontAwesome
						name="map-marker"
						size={36}
						color={colors.textSubtle}
						onPress={() => navigate('Settings')}
					/>
					<FontAwesome
						name="info-circle"
						size={36}
						color={colors.textSubtle}
						onPress={() => navigate('Info')}
					/>
				</Footer>
			</BackgroundView>
		);
	}
}
HomeScreen.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};
