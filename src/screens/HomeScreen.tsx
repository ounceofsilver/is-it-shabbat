import { FontAwesome } from '@expo/vector-icons';
import { AdMobBanner } from 'expo';
import i18n from 'i18n-js';
import { styles } from 'is-it-shabbat-core';
import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleProp, View, ViewStyle } from 'react-native';

import { MajorHolidays, MinorHolidays, ModernHolidays, RoshChodeshim } from '../components/holidays/Holidays';
import IsItShabbat from '../components/shabbat/IsItShabbat';
import { AppTitleText, BackgroundView, CenteredContainer, CopyrightText, Footer, HolidayTitleText } from '../Styles';

const getBannerSize = ({ width }: { width: number }): 'fullBanner' | 'largeBanner' => {
	if (width >= 728) {
		return 'fullBanner';
	}
	return 'largeBanner';
};

const footerToolbarHeight: number = 56;

export default ({ navigation: { navigate } }: {
	navigation: { navigate: (state: string) => void },
}) => (
	<BackgroundView>
		<StatusBar hidden />

		<CenteredContainer style={{ marginBottom: 120 } as StyleProp<ViewStyle>}>
			<AdMobBanner
				bannerSize={getBannerSize(Dimensions.get('window'))}
				adUnitID='ca-app-pub-4520712444019649/7098316428'
				testDeviceID='EMULATOR'
				// eslint-disable-next-line no-console
				// onDidFailToReceiveAdWithError={console.error}
			/>
		</CenteredContainer>

		<ScrollView>
			<CenteredContainer>
				<AppTitleText>
					{i18n.t('title')}
				</AppTitleText>
			</CenteredContainer>
				<CenteredContainer style={{ marginTop: 30 } as StyleProp<ViewStyle>}>
				<IsItShabbat />
			</CenteredContainer>

			<View style={{ marginTop: 80 }}>
				<HolidayTitleText>Major Holidays</HolidayTitleText>
				<MajorHolidays />
			</View>

			<View style={{ marginTop: 20 }}>
				<HolidayTitleText>Minor Holidays</HolidayTitleText>
				<MinorHolidays />
			</View>

			<View style={{ marginTop: 20 }}>
				<HolidayTitleText>Rosh Chodeshim</HolidayTitleText>
				<RoshChodeshim />
			</View>

			<View style={{ marginTop: 20 }}>
				<HolidayTitleText>Modern Holidays</HolidayTitleText>
				<ModernHolidays />
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

		<Footer style={{ height: footerToolbarHeight } as StyleProp<ViewStyle>}>
			<FontAwesome
				name='map-marker'
				size={36}
				color={styles.colors.textSubtle}
				onPress={() => navigate('Settings')}
			/>
			<FontAwesome
				name='leaf'
				size={36}
				color={styles.colors.textSubtle}
				onPress={() => navigate('Omer')}
			/>
		</Footer>
	</BackgroundView>
);
