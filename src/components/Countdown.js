import React, {
	Component,
} from 'react';
import {
	Text,
} from 'react-native';
import { DateTime } from 'luxon';

export default class CountDown extends Component {
	constructor(props) {
		super(props);
		this.realStart = DateTime.local();
		this.state = {
			realNow: DateTime.local(),
		};
	}

	componentDidMount() {
		this.timerId = setInterval(
			() => this.tick(),
			1000,
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	getTime() {
		const { realNow } = this.state;
		const { start } = this.props;
		return start.plus(realNow - this.realStart);
	}

	durationLeft() {
		const { end, start } = this.props;
		const { realNow } = this.state;
		return (end.diff(start)).minus(realNow - this.realStart).shiftTo("days", "hours", "minutes", "seconds");
	}

	tick() {
		const callback = this.props;
		this.setState({
			realNow: DateTime.utc(),
		});
		if (this.durationLeft() <= 0) {
			callback(this.getTime());
		}
	}

	render() {
		const { style } = this.props;
		const d = this.durationLeft().toObject();
		d.seconds = Math.floor(d.seconds);
		return <Text style={style}>{`${d.days}d ${d.hours}h ${d.minutes}m ${d.seconds}s`}</Text>;
	}
}
