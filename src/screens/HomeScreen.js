import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	View,
	ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import {
	styles,
	localization,
} from 'is-it-shabbat-core';

import {
	BackgroundView,
	Footer,
	CenteredContainer,
	SubtitleCenterText,
} from '../Styles';

import IsItShabbat from '../components/IsItShabbat';
import Holidays from '../components/Holidays';

const { en: { translate } } = localization;

export default class HomeScreen extends Component {
	render() {
		const { navigation: { navigate } } = this.props;
		return (
			<BackgroundView>
				<ScrollView ref={this.scrollView}>
					<CenteredContainer style={{ marginTop: 35 }}>
						<SubtitleCenterText style={{ fontSize: 32 }}>
							{translate.title}
						</SubtitleCenterText>
					</CenteredContainer>
					<CenteredContainer style={{ marginTop: 30, marginBottom: 40 }}>
						<IsItShabbat />
					</CenteredContainer>

					<View style={{ marginTop: 40, paddingHorizontal: '7%', paddingBottom: 56 }}>
						<Holidays />
					</View>

					<SubtitleCenterText style={{ paddingBottom: 56, fontSize: 18 }}>
						{translate.copyright}
					</SubtitleCenterText>

				</ScrollView>

				<Footer style={{ height: 56 }}>
					<FontAwesome
						name="map-marker"
						size={36}
						color={styles.colors.textSubtle}
						onPress={() => navigate('Settings')}
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
