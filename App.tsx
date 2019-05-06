import { AppLoading } from 'expo';
import { state } from 'is-it-shabbat-core';
import { Component } from 'react';
import React from 'react';
import { Provider } from 'react-redux';

import initialization from './src/initialization';
import Router from './src/Router';

class App extends Component {
	public state = {
		isReady: false,
	};

	public render() {
		const { isReady } = this.state;
		return isReady
			? (
				<Provider store={state}>
					<Router />
				</Provider>
			)
			: (
				<AppLoading
					startAsync={initialization}
					onFinish={() => this.setState({ isReady: true })}
					onError={(...args) => {
						// tslint:disable-next-line: no-console
						console.warn(...args);
					}}
				/>
			);
	}
}

export default App;
