import React, { Component } from 'react';
import {
	AppLoading,
} from 'expo';

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
				<Router />
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
