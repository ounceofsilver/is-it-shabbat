import React from 'react';

import LocationPicker from '../components/location/LocationPicker';
import UseCurrentLocationButton from '../components/location/UseCurrentLocationButton';
import { BackgroundView } from '../Styles';

export default () => (
	<BackgroundView>
		<LocationPicker />
		<UseCurrentLocationButton />
	</BackgroundView>
);
