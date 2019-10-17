import { AppLoading } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import { useEffect, useState } from 'react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { is } from 'shabbat-logic';

import { AppState } from '../../core/store';
import { clearError } from '../../core/store/error';
import { getShabbatState } from '../selectors';
import { getLocalizedError } from '../selectors/error';
import {
	candlelightingTheme,
	defaultTheme,
	shabbatTheme,
	ThemeProvider,
} from '../theme';
import initialization from './initialization';
import Router from './Router';
import store from './store';

export const App = () => {
	useKeepAwake();

	// Theming
	const [theme, setTheme] = useState(defaultTheme);

	useEffect(() => {
		const intervalId = setInterval(
			() => {
				const state: AppState = store.getState();
				const { period } = getShabbatState(state);
				if (!period) { return; }
				switch(period) {
				case is.SHABBAT:
					setTheme(shabbatTheme);
					break;
				case is.CANDLELIGHTING:
					setTheme(candlelightingTheme);
					break;
				case is.NOT_SHABBAT:
					setTheme(defaultTheme);
					break;
				}
			},
			60 * 1000,
		);
		// setTheme(shabbatTheme);

		return () => clearInterval(intervalId);
	},        []);

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
			<ReduxProvider store={store}>
				<ThemeProvider theme={theme}>
					<Router />
				</ThemeProvider>
			</ReduxProvider>
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
