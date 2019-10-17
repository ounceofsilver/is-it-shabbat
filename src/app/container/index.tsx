import { AppLoading } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { AppState } from '../../core/store';
import { clearError } from '../../core/store/error';
import { getLocalizedError } from '../selectors/error';
import initialization from './initialization';
import Router from './Router';
import store from './store';

export const App = () => {
	useKeepAwake();

	// Handle errors
	useEffect(() => store.subscribe(() => {
		const state: AppState = store.getState();
		const localizedError = getLocalizedError(state);
		if (localizedError) {
			alert(localizedError);
			store.dispatch(clearError());
		}
	}), 	     []);

	// Initialization sequence
	const [isReady, setReady] = useState(false);

	return isReady
		? (
			<Provider store={store}>
				<Router />
			</Provider>
		) : (
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
