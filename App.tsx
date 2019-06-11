import { AppLoading } from 'expo';
import { useKeepAwake } from 'expo-keep-awake';
import { action, state } from 'is-it-shabbat-core';
import { useEffect, useState } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

import initialization from './src/initialization';
import Router from './src/Router';
import { getTime } from './src/time';

export default () => {
	const [isReady, setReady] = useState(false);

	useKeepAwake();

	useEffect(() => {
		const intervalId = setInterval(
			() => state.dispatch(action.setNow(getTime())),
			20 * 1000,
		);
		return () => clearInterval(intervalId);
	});

	return isReady
		? (
			<Provider store={state}>
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
