import i18n from 'i18n-js';
import { setLocation as _setLocation } from 'is-it-shabbat-core/dist/store/use/config';
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import getLocation from './getLocation';

const UseCurrentLocationButton = ({ setLocation }) => (
	<Button
		title={i18n.t('settings.location.useCurrentLocation')}
		onPress={async () => setLocation(await getLocation())}
	/>
);

export default connect(() => ({}), { setLocation: _setLocation })(UseCurrentLocationButton);
