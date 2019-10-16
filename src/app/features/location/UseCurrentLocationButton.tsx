import i18n from 'i18n-js';
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import { setLocation as _setLocation } from '../../../core/store/use/config';
import getLocation from './getLocation';

const UseCurrentLocationButton = ({ setLocation }) => (
	<Button
		title={i18n.t('settings.location.useCurrentLocation')}
		onPress={async () => setLocation(await getLocation())}
	/>
);

export default connect(() => ({}), { setLocation: _setLocation })(UseCurrentLocationButton);
