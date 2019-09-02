import { AppLoading } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import { useState } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

import initialization from './src/initialization';
import Router from './src/Router';

import store from './src/store';

export default () => {
	const [isReady, setReady] = useState(false);

	useKeepAwake();

	return isReady
		? (
			<Provider store={store}>
				<Router />
			</Provider>
		)
		: (
			<AppLoading
				startAsync={initialization}
				onFinish={() => setReady(true)}
				onError={(...args) => {
					// tslint:disable-next-line: no-console
					console.warn(...args);
				}}
			/>
		);
};
