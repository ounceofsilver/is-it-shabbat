import React from 'react';
import { View } from 'react-native';

import { BackgroundView } from '../elements/styles';
import Omer from '../features/omer/Omer';

export default () => (
	<BackgroundView>
		<View style={{
			padding: 20,
		}}>
			<Omer withBlessing />
		</View>
	</BackgroundView>
);
