import React from 'react';

import LocationPicker from '../components/LocationPicker';
import UseCurrentLocationButton from '../components/UseCurrentLocationButton';
import { BackgroundView } from '../Styles';

export default () => (
	<BackgroundView>
		<LocationPicker />
		<UseCurrentLocationButton />
	</BackgroundView>
);
