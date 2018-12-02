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
	SubtitleCenterText,

	SubtitleText,
	SecondaryText,
} from '../Styles';
import spacetime from '../logic/SpaceTimeState';
import holidayState from '../logic/HolidayState';

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.scrollView = React.createRef();
	}

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

		// console.log(holidays.map(h => h.date));

		// TODO: add in Redux Provider to avoid having subscription be triggered
		// when user is on another screen and spacetime.user store is updated.
		return (
			<BackgroundView>
				<ScrollView ref={this.scrollView}>
					<CenteredContainer style={{ height: 200, marginTop: 90 }}>

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
										{(dur) => {
											const {
												days, hours, minutes, seconds,
											} = dur.shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
											let x = `${days}d ${hours}h ${minutes}m ${seconds}s`;
											if (minutes === 0 && hours === 0 && days === 0) {
												x = `${seconds}s`;
											} else if (hours === 0 && days === 0) {
												x = `${minutes}m ${seconds}s`;
											} else if (days === 0) { //
												x = `${hours}h ${minutes}m ${seconds}s`;
											}
											return (
												<SubtitleCenterText>
													{x}
												</SubtitleCenterText>
											);
										}}
									</CountDown>
									<SubtitleCenterText>
										{`until ${endEventName[period]}`}
									</SubtitleCenterText>
								</View>
							)}
						</ShabbatCheck>

					</CenteredContainer>

					<CenteredContainer>
						<FontAwesome
							name="angle-down"
							size={64}
							color={colors.textSubtle}
							onPress={() => this.scrollView.current.scrollToEnd()}
						/>
					</CenteredContainer>

					<View style={{ marginTop: 140, paddingHorizontal: '7%', paddingBottom: 56 }}>
						{
							holidays.filter(h => h.date > now).slice(0, 3).map(holiday => (
								<View key={holiday.date.toString()} style={{ marginBottom: 15 }}>
									<SecondaryText>
										{ holiday.title }
									</SecondaryText>
									<CountDown
										end={holiday.date}
										start={now}
										callback={spacetime.set.now}
									>
										{(dur) => {
											const {
												weeks, days, hours, minutes, seconds,
											} = dur.shiftTo('weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
											let y = `${weeks}w`;
											if (weeks === 0 && days === 0 && hours <= 2) {
												y = `${hours}h ${minutes}m ${seconds}s`;
											} else if (weeks === 0 && days === 0) {
												y = `${hours}h ${minutes}m`;
											} else if (weeks === 0) {
												y = `${days}d ${hours}h`;
											} else if (weeks <= 2) {
												y = `${weeks}w ${days}d`;
											}
											return (
												<SubtitleText style={{ paddingLeft: 15 }}>
													{y}
												</SubtitleText>
											);
										}}
									</CountDown>
								</View>
							))
						}
					</View>
				</ScrollView>

				<Footer style={{ height: 56 }}>
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
