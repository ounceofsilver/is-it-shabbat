import React from 'react';

import i18n from 'i18n-js';

import { BackgroundView, CopyrightText } from '../elements/styles';
import LocationPicker from '../features/location/LocationPicker';
import UseCurrentLocationButton from '../features/location/UseCurrentLocationButton';
import { Platform } from 'react-native';

export default () => (
	<BackgroundView>
		<LocationPicker />
		<UseCurrentLocationButton />
		{/* TODO: styling, localization */}
		<CopyrightText>
			All times are shown in local device time, even if another location is selected.
			Sunset times are approximate. The candlelighting period begins 18 minutes before Shabbat. Shabbat ends 42 minutes after sunset.
		</CopyrightText>
		<CopyrightText>
			{i18n.t('copyright')}
		</CopyrightText>
	</BackgroundView>
);
