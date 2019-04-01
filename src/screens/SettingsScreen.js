import React from 'react';

import LocationPicker from '../components/LocationPicker';
import {
	BackgroundView,
} from '../Styles';
import UseCurrentLocationButton from '../components/UseCurrentLocationButton';

export default function SettingsScreen() {
	return (
		<BackgroundView>
			<LocationPicker />
			<UseCurrentLocationButton />
		</BackgroundView>
	);
}
