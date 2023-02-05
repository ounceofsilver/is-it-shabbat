import React from 'react';

import i18n from 'i18n-js';

import { BackgroundView, CopyrightText, MainText, PrimaryCenterText, SecondaryText, ShabbatSubtitleText, ShabbatText } from '../elements/styles';
import LocationPicker from '../features/location/LocationPicker';
import UseCurrentLocationButton from '../features/location/UseCurrentLocationButton';
import { Button, ScrollView, View } from 'react-native';

export default ({
	navigation: { navigate },
}: {
	navigation: { navigate: (state: string) => void };
}) => (
	<BackgroundView>
		<ScrollView>
			<PrimaryCenterText>Set Location</PrimaryCenterText>
			<LocationPicker />
			<UseCurrentLocationButton />
			<View style={{ height: 40 }}/>

			<View style={{ padding: 10 }}>
				<MainText>
					All times are shown in local device time, even if another location is selected.
				</MainText>
				<MainText>
					All times are based on approximate sunset times.
				</MainText>
				<MainText>
					Shabbat is assumed to begin at sunset. Candlelighting begins 18 minutes before Shabbat. Shabbat is assumed to end 42 minutes after sunset.
				</MainText>
			</View>

			<View style={{ height: 40 }}/>
			<CopyrightText>
				{i18n.t('copyright')}
			</CopyrightText>
		</ScrollView>
	</BackgroundView>
);
