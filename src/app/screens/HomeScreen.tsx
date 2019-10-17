import { FontAwesome } from '@expo/vector-icons';
import { AdMobBanner } from 'expo';
import i18n from 'i18n-js';
import React from 'react';
import {
	Dimensions,
	Platform,
	ScrollView,
	Share,
	StatusBar,
	StyleProp,
	View,
	ViewStyle,
} from 'react-native';

import {
	AppTitleText,
	BackgroundView,
	CenteredContainer,
	CopyrightText,
	Footer,
	HolidayHeadingText,
} from '../elements/styles';
import { MajorHolidays, RoshChodeshim } from '../features/holidays/Holidays';
import OmerPrompt from '../features/holidays/OmerPrompt';
import IsItShabbat from '../features/shabbat/IsItShabbat';
import { defaultTheme, useTheme } from '../theme';

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
}) => {
	const theme = useTheme(defaultTheme);

	return (
		<BackgroundView>
			<StatusBar hidden />

			{Platform.OS !== 'web' && (
				<>
					<CenteredContainer>
						<AdMobBanner
							bannerSize={getBannerSize(Dimensions.get('window'))}
							adUnitID='ca-app-pub-4520712444019649/7098316428'
							testDeviceID='EMULATOR'
							// eslint-disable-next-line no-console
							// onDidFailToReceiveAdWithError={console.error}
						/>
					</CenteredContainer>
					<View style={{ marginBottom: 120 } as StyleProp<ViewStyle>} />
				</>
			)}
			<ScrollView>
				{Platform.OS === 'web' && (
					<View style={{ marginBottom: 40 } as StyleProp<ViewStyle>} />
				)}
				<CenteredContainer>
					<AppTitleText>{i18n.t('title')}</AppTitleText>
				</CenteredContainer>
				<View style={{ marginBottom: 30 } as StyleProp<ViewStyle>} />
				<CenteredContainer>
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

				<View style={{
					marginBottom: footerToolbarHeight,
					marginTop: 40,
				} as StyleProp<ViewStyle>}>
					<CopyrightText>
						{i18n.t('copyright')}
					</CopyrightText>
				</View>
			</ScrollView>

			{Platform.OS !== 'web' && (
				<>
					<View style={{ height: footerToolbarHeight } as StyleProp<ViewStyle>} />
					<Footer>
						<FontAwesome
							name='cog'
							size={36}
							color={theme.colors.textSubtle}
							onPress={() => navigate('Settings')}
						/>
						<FontAwesome
							name='share'
							size={36}
							color={theme.colors.textSubtle}
							onPress={() => Share.share({
								message: i18n.t('share.message'),
								url: 'https://isitshabbat.net',
							})}
						/>
					</Footer>
				</>
			)}
		</BackgroundView>
	);
};
