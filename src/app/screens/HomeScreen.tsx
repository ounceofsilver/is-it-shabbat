import { A } from '@expo/html-elements';
import i18n from 'i18n-js';
import React from 'react';
import {
	Image,
	Platform,
	Pressable,
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
	Footer,
	HolidayHeadingText,
} from '../elements/styles';
import { MajorHolidays, RoshChodeshim } from '../features/holidays/Holidays';
import IsItShabbat from '../features/shabbat/IsItShabbat';
import { colors } from '../theme';

const footerToolbarHeight: number = 56;

export default ({
	navigation: { navigate },
}: {
	navigation: { navigate: (state: string) => void };
}) => {
	return (
		<BackgroundView>
			<StatusBar hidden />

			{/* TODO: add admob ads for android and apple */}

			<ScrollView>
				<View style={{ marginBottom: 100 } as StyleProp<ViewStyle>} />
				<CenteredContainer>
					<AppTitleText>{i18n.t('title')}</AppTitleText>
				</CenteredContainer>

				<View style={{ marginBottom: 50 } as StyleProp<ViewStyle>} />
				<CenteredContainer>
					<IsItShabbat />
				</CenteredContainer>

				<CenteredContainer>
					{/* <OmerPrompt goToOmerPage={() => navigate('Omer')} /> */}
				</CenteredContainer>

				{/* TODO: add holidays page which shows more than 3 */}
				{/* TODO: make pages for more types of holidays */}
				{/* TODO: make settings for what holiday types to show */}
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
				</View>
			</ScrollView>

					<View style={{ height: footerToolbarHeight } as StyleProp<ViewStyle>} />
					<Footer>
						<Pressable onPress={() => navigate('Settings')}>
							<Image source={require('./Gear Icon.png')} style={{ width: 36, height: 36 }} />
						</Pressable>
						<Pressable onPress={() => Share.share({
								message: i18n.t('share.message'),
								url: 'https://isitshabbat.net',
						})}>
							<Image source={require('./Share Icon.png')} style={{ width: 36, height: 36 }} />
						</Pressable>
					</Footer>
		</BackgroundView>
	);
};
