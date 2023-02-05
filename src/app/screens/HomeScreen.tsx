import { FontAwesome } from '@expo/vector-icons';
import i18n from 'i18n-js';
import React from 'react';
import {
	ScrollView,
	Share,
	StatusBar,
	StyleProp,
	View,
	ViewStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getTimezone } from '../../core/store/config/selectors';

import {
	AppTitleText,
	BackgroundView,
	CenteredContainer,
	CopyrightText,
	Footer,
	HolidayHeadingText,
	ShabbatSubtitleText,
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
	const timezone = useSelector(getTimezone);
	return (
		<BackgroundView>
			<StatusBar hidden />

			<ScrollView>
				<View style={{ marginBottom: 100 } as StyleProp<ViewStyle>} />
				<CenteredContainer>
					<AppTitleText>{i18n.t('title')}</AppTitleText>
				</CenteredContainer>

				<View style={{ marginBottom: 30 } as StyleProp<ViewStyle>} />
				<CenteredContainer>
					<IsItShabbat />
				</CenteredContainer>

				<CenteredContainer>
					{/* <OmerPrompt goToOmerPage={() => navigate('Omer')} /> */}
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
				</View>
			</ScrollView>

					<View style={{ height: footerToolbarHeight } as StyleProp<ViewStyle>} />
					<Footer>
						<FontAwesome
							name='cog'
							size={36}
							color={colors.textMain}
							onPress={() => navigate('Settings')}
						/>
						<ShabbatSubtitleText>(in {timezone})</ShabbatSubtitleText>
						<FontAwesome
							name='share'
							size={36}
							color={colors.textMain}
							onPress={() => Share.share({
								message: i18n.t('share.message'),
								url: 'https://isitshabbat.net',
							})}
						/>
					</Footer>
		</BackgroundView>
	);
};
