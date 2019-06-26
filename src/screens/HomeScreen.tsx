import { FontAwesome } from '@expo/vector-icons';
import { AdMobBanner } from 'expo';
import i18n from 'i18n-js';
import { styles } from 'is-it-shabbat-core';
import React from 'react';
import {
	Dimensions,
	Platform,
	ScrollView,
	StatusBar,
	StyleProp,
	View,
	ViewStyle,
} from 'react-native';

import { MajorHolidays, RoshChodeshim } from '../components/holidays/Holidays';
import OmerPrompt from '../components/holidays/OmerPrompt';
import IsItShabbat from '../components/shabbat/IsItShabbat';
import {
	AppTitleText,
	BackgroundView,
	CenteredContainer,
	CopyrightText,
	Footer,
	HolidayHeadingText,
} from '../Styles';

const getBannerSize = ({
	width,
}: {
	width: number;
}): 'fullBanner' | 'largeBanner' => {
	if (width >= 728) {
		return 'fullBanner';
	}
	return 'largeBanner';
};

const footerToolbarHeight: number = 56;

export default ({
	navigation: { navigate },
}: {
	navigation: { navigate: (state: string) => void };
}) => (
	<BackgroundView>
		<StatusBar hidden />

		{Platform.OS !== 'web' && (
			<CenteredContainer
				style={{ marginBottom: 120 } as StyleProp<ViewStyle>}
			>
				<AdMobBanner
					bannerSize={getBannerSize(Dimensions.get('window'))}
					adUnitID='ca-app-pub-4520712444019649/7098316428'
					testDeviceID='EMULATOR'
					// eslint-disable-next-line no-console
					// onDidFailToReceiveAdWithError={console.error}
				/>
			</CenteredContainer>
		)}
		<ScrollView>
			{Platform.OS === 'web' && (
				<View style={{ marginBottom: 40 } as StyleProp<ViewStyle>} />
			)}
			<CenteredContainer>
				<AppTitleText>{i18n.t('title')}</AppTitleText>
			</CenteredContainer>
			<CenteredContainer
				style={{ marginTop: 30 } as StyleProp<ViewStyle>}
			>
				<IsItShabbat />
			</CenteredContainer>

			<CenteredContainer>
				<OmerPrompt goToOmerPage={() => navigate('Omer')} />
			</CenteredContainer>

			<View style={{ marginTop: 60 }}>
				<HolidayHeadingText>{i18n.t('holidays.headings.major')}</HolidayHeadingText>
				<MajorHolidays />
			</View>

			<View style={{ marginTop: 40 }}>
				<HolidayHeadingText>{i18n.t('holidays.headings.roshchodeshim')}</HolidayHeadingText>
				<RoshChodeshim />
			</View>

			<CopyrightText
				style={{
					marginBottom: footerToolbarHeight,
					marginTop: 40,
				} as StyleProp<ViewStyle>}
			>
				{i18n.t('copyright')}
			</CopyrightText>
		</ScrollView>

		{Platform.OS !== 'web' && (
			<Footer
				style={{ height: footerToolbarHeight } as StyleProp<ViewStyle>}
			>
				<FontAwesome
					name='map-marker'
					size={36}
					color={styles.colors.textSubtle}
					onPress={() => navigate('Settings')}
				/>
			</Footer>
		)}
	</BackgroundView>
);
