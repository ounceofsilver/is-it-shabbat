import React from 'react';

import { BackgroundView } from '../elements/styles';
import Omer from '../features/omer/Omer';

export default () => (
	<BackgroundView style={{
		padding: 20,
	}}>
		<Omer withBlessing />
	</BackgroundView>
);
