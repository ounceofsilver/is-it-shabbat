import React from 'react';

import { BackgroundView } from '../elements/styles';
import LocationPicker from '../features/location/LocationPicker';
import UseCurrentLocationButton from '../features/location/UseCurrentLocationButton';

export default () => (
	<BackgroundView>
		<LocationPicker />
		<UseCurrentLocationButton />
	</BackgroundView>
);
