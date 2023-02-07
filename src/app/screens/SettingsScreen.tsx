import React from 'react';

import i18n from 'i18n-js';

import { BackgroundView, CopyrightText, MainText, PrimaryCenterText, SecondaryText, ShabbatSubtitleText, ShabbatText } from '../elements/styles';
import LocationPicker from '../features/location/LocationPicker';
import UseCurrentLocationButton from '../features/location/UseCurrentLocationButton';
import { ScrollView, View } from 'react-native';
import { A } from '@expo/html-elements';


export default ({
	navigation: { navigate },
}: {
	navigation: { navigate: (state: string) => void };
}) => (
	<BackgroundView>
		<ScrollView>
			<PrimaryCenterText>{i18n.t('settings.location.set')}</PrimaryCenterText>
			<LocationPicker />
			<UseCurrentLocationButton />
			<View style={{ height: 40 }}/>

			<View style={{ padding: 10 }}>
				<MainText>
					{i18n.t('notes.localtime')}
				</MainText>
				<MainText>
					{i18n.t('notes.approximate')}
				</MainText>
				<MainText>
					{i18n.t('notes.calculations')}
				</MainText>
				<MainText>
					{i18n.t('notes.holidayssource')}
				</MainText>
			</View>

			<View style={{ height: 40 }}/>
			<CopyrightText>
				{i18n.t('copyright')}
			</CopyrightText>
			<CopyrightText>
				<A href="https://anounceofsilver.com/is-it-shabbat-privacy-policy.html">{i18n.t('privacy')}</A>
			</CopyrightText>
		</ScrollView>
	</BackgroundView>
);
