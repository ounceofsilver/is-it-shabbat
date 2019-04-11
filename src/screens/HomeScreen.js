import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AdMobBanner } from 'expo';
import {
	View,
	ScrollView,
	Dimensions,
	StatusBar,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';

import {
	styles,
} from 'is-it-shabbat-core';

import {
	BackgroundView,
	Footer,
	CenteredContainer,
	SubtitleCenterText,
} from '../Styles';

import IsItShabbat from '../components/IsItShabbat';
import Holidays from '../components/Holidays';

const getBannerSize = ({ width }) => {
	if (width >= 728) {
		return 'fullBanner';
	}
	return 'largeBanner';
};

const footerToolbarHeight = 56;
export default class HomeScreen extends Component {
	render() {
		const { navigation: { navigate } } = this.props;
		return (
			<BackgroundView>
				<StatusBar hidden />

				<CenteredContainer style={{ marginBottom: 120 }}>
					<AdMobBanner
						bannerSize={getBannerSize(Dimensions.get('window'))}
						adUnitID="ca-app-pub-4520712444019649/7098316428"
						testDeviceID="EMULATOR"
						// eslint-disable-next-line no-console
						onDidFailToReceiveAdWithError={console.error}
					/>
				</CenteredContainer>

				<ScrollView>
					<CenteredContainer>
						<SubtitleCenterText style={{ fontSize: 32 }}>
							{i18n.t('title')}
						</SubtitleCenterText>
					</CenteredContainer>
					<CenteredContainer style={{ marginTop: 30 }}>
						<IsItShabbat />
					</CenteredContainer>

					<View style={{ marginTop: 80 }}>
						<Holidays />
					</View>

					<SubtitleCenterText
						style={{
							marginTop: 40,
							marginBottom: footerToolbarHeight,
							fontSize: 18,
						}}
					>
						{i18n.t('copyright')}
					</SubtitleCenterText>

				</ScrollView>

				<Footer style={{ height: footerToolbarHeight }}>
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
