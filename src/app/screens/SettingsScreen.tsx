import React from 'react';

import LocationPicker from '../features/location/LocationPicker';
import UseCurrentLocationButton from '../features/location/UseCurrentLocationButton';
import { BackgroundView } from '../Styles';

export default () => (
	<BackgroundView>
		<LocationPicker />
		<UseCurrentLocationButton />
	</BackgroundView>
);
