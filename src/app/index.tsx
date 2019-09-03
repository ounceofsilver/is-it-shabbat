import { AppLoading } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import { useState } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

import ErrorMessage from './components/error/ErrorMessage';
import initialization from './initialization';
import Router from './Router';
import store from './store';

export const App = () => {
	const [isReady, setReady] = useState(false);

	useKeepAwake();

	return isReady
		? (
			<Provider store={store}>
				<ErrorMessage />
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
