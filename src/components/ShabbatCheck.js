import React, {
	Component,
} from 'react';
import {
	Text,
	View,
} from 'react-native';

import CountDown from './Countdown';
import state from '../logic/State';
import Shabbat from '../logic/Shabbat';
import Styles from '../Styles';

const message = {
	[Shabbat.is.SHABBAT]: 'Yes!',
	[Shabbat.is.NOT_SHABBAT]: 'No...',
	[Shabbat.is.CANDLELIGHTING]: 'Almost...',
};

const endEventName = {
	[Shabbat.is.SHABBAT]: 'Shabbat ends',
	[Shabbat.is.NOT_SHABBAT]: 'candle lighting',
	[Shabbat.is.CANDLELIGHTING]: 'Shabbat begins',
};

export default class ShabbatCheck extends Component {
	componentDidMount() {
		state.user.subscribe(() => {
			this.setState(state.user.getState());
		});
	}

	render() {
		const { now, location } = state.user.getState();
		if (!location) {
			return null;
		}
		const { coords: { latitude, longitude } } = location;
		const { period, countDownTo } = Shabbat.isItShabbat(now, latitude, longitude);
		const { style } = this.props;

		return (
			<View style={style}>
				<Text
					style={[Styles.title, Styles.center]}
				>
					{`${message[period]}`}
				</Text>
				<CountDown
					style={[Styles.subtitle, Styles.center]}
					end={countDownTo}
					start={now}
					callback={state.set.now}
				/>
				<Text
					style={
						[Styles.subtitle, Styles.center]
					}
				>
					{`until ${endEventName[period]}`}
				</Text>
			</View>
		);
	}
}
