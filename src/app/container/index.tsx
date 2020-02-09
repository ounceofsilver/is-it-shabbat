import { useKeepAwake } from 'expo-keep-awake';
import { useEffect, useState } from 'react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { is } from 'shabbat-logic';

import i18n from 'i18n-js';
import { AppState } from '../../core/store';
import { clearError, getError, setError } from '../../core/store/error';
import { getShabbatState } from '../custom-selectors';
import {
	AppTitleText,
	BackgroundView,
	CenteredContainer,
} from '../elements/styles';
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
				const shabbatState = getShabbatState(state);
				if (!shabbatState) { return; }
				switch (shabbatState.period) {
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
		const localizedError = getError(state, i18n.t.bind(i18n));
		if (localizedError) {
			alert(localizedError);
			store.dispatch(clearError());
		}
	}), 	     []);

	// Initialization sequence
	const [isReady, setReady] = useState(false);
	const [errorMessage, setErrorMessage] = useState(undefined);

	useEffect(() => {
		initialization()
			.then(() => {
				setReady(true);
			})
			.catch((err) => {
				// tslint:disable-next-line: no-console
				console.error('Failed to load app:', err);
				store.dispatch(setError('loading.error'));
				setErrorMessage('loading.error');
			});
	}, 		     []);

	return (isReady && !(errorMessage))
		? (
			<ReduxProvider store={store}>
				<ThemeProvider theme={theme}>
					<Router />
				</ThemeProvider>
			</ReduxProvider>
		) : (
			<BackgroundView>
				<CenteredContainer>
					<AppTitleText>{i18n.t(errorMessage || 'loading.message')}</AppTitleText>
				</CenteredContainer>
			</BackgroundView>
		);
};
