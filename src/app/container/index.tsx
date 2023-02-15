import { useKeepAwake } from 'expo-keep-awake';
import { useEffect, useState } from 'react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Text } from 'react-native';

import i18n from 'i18n-js';

import { AppState } from '../../core/store';
import { clearError, getError, setError } from '../../core/store/error';
import {
	BackgroundView,
	CenteredContainer,
} from '../elements/styles';
import initialization from './initialization';
import { Router } from './Router';
import store from './store';

export const App = () => {
	useKeepAwake();

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
				console.error('Failed to load app:', err);
				store.dispatch(setError('loading.error'));
				setErrorMessage('loading.error');
			});
	}, 		     []);

	return (isReady && !(errorMessage))
		? (
			<ReduxProvider store={store}>
				<Router />
			</ReduxProvider>
		) : (
			<BackgroundView>
				<CenteredContainer>
					<Text>{i18n.t(errorMessage || 'loading.message')}</Text>
				</CenteredContainer>
			</BackgroundView>
		);
};
