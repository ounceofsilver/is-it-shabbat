import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import {
	state,
	styles,
} from 'is-it-shabbat-core';

import {
	BackgroundView,
	Footer,
	CenteredContainer,
} from '../Styles';

import IsItShabbat from '../components/IsItShabbat';
import Holidays from '../components/Holidays';


const { spacetime, holidays } = state;

export default class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.scrollView = React.createRef();
	}

	componentDidMount() {
		spacetime.user.subscribe(() => {
			this.setState({});
		});
		holidays.state.subscribe(() => {
			this.setState({});
		});
	}

	render() {
		const { navigation: { navigate } } = this.props;

		const { now, location } = spacetime.user.getState();
		const holidaysArray = holidays.state.getState().holidays;

		// TODO: add in Redux Provider to avoid having subscription be triggered
		// when user is on another screen and spacetime.user store is updated.
		return (
			<BackgroundView>
				<ScrollView ref={this.scrollView}>
					<CenteredContainer style={{ height: 200, marginTop: 90 }}>
						<IsItShabbat
							now={now}
							location={location}
						/>
					</CenteredContainer>

					<CenteredContainer>
						<FontAwesome
							name="angle-down"
							size={64}
							color={styles.colors.textSubtle}
							onPress={() => this.scrollView.current.scrollToEnd()}
						/>
					</CenteredContainer>

					<View style={{ marginTop: 140, paddingHorizontal: '7%', paddingBottom: 56 }}>
						<Holidays
							holidays={holidaysArray}
							now={now}
						/>
					</View>

				</ScrollView>

				<Footer style={{ height: 56 }}>
					<FontAwesome
						name="map-marker"
						size={36}
						color={styles.colors.textSubtle}
						onPress={() => navigate('Settings')}
					/>
					<FontAwesome
						name="info-circle"
						size={36}
						color={styles.colors.textSubtle}
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
