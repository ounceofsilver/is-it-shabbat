import React, { Component } from 'react';
import {
	AppLoading,
} from 'expo';
import { Provider } from 'react-redux';

import { state } from 'is-it-shabbat-core';

import initialize from './src/initialization';
import Router from './src/Router';

class BaseApp extends Component {
	state = {
		isReady: false,
	};

	render() {
		const { isReady } = this.state;
		return isReady
			? (
				<Provider store={state}>
					<Router />
				</Provider>
			)
			: (
				<AppLoading
					startAsync={initialize}
					onFinish={() => this.setState({ isReady: true })}
					onError={(...args) => {
						console.warn(...args); // eslint-disable-line
					}}
				/>
			);
	}
}

export default BaseApp;
