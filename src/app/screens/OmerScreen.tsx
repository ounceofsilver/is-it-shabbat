import React from 'react';

import Omer from '../features/omer/Omer';
import { BackgroundView } from '../Styles';

export default () => (
	<BackgroundView style={{
		padding: 20,
	}}>
		<Omer withBlessing />
	</BackgroundView>
);
