import { AppLoading } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import i18n from 'i18n-js';
import { useEffect, useState } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

import { clearError } from '../core/store/use/error';
import initialization from './initialization';
import Router from './Router';
import store from './store';

export const App = () => {
	const [isReady, setReady] = useState(false);

	useKeepAwake();

	useEffect(() => store.subscribe(() => {
		const state = store.getState();
		if (state.error.message) {
			alert(state.error.localize ? i18n.t(state.error.message) : state.error.message);
			store.dispatch(clearError());
		}
	}), 	     []);

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
