import React from 'react';

import { localization } from 'is-it-shabbat-core';

import {
	BackgroundView,
	TitleCenterText,
	SubtitleCenterText,
} from '../Styles';

const { en: { translate } } = localization;

const InfoScreen = () => (
	<BackgroundView style={{ paddingVertical: 20 }}>
		<TitleCenterText style={{ fontSize: 24 }}>
			{translate.copyright}
		</TitleCenterText>
		<SubtitleCenterText>
			{translate.credit}
		</SubtitleCenterText>
	</BackgroundView>
);

export default InfoScreen;
