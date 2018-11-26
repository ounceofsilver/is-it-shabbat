import React, {
	Component,
} from 'react';
import {
	Text,
} from 'react-native';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';


export default class CountDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			realNow: DateTime.local(),
		};
		this.startCountdown();
	}

	componentDidMount() {
		this.timerId = setInterval(
			() => this.tick(),
			199,
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

	startCountdown() {
		this.realStart = DateTime.local();
	}

	durationLeft() {
		const { end, start } = this.props;
		const { realNow } = this.state;
		return (end.diff(start)).minus(realNow - this.realStart).shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds');
	}

	update() {
		this.setState({
			realNow: DateTime.utc(),
		});
	}

	tick() {
		const { callback } = this.props;
		this.update();
		if (this.durationLeft() <= 0) {
			callback(this.getTime());
			this.startCountdown();
			this.update();
		}
	}

	render() {
		const { style } = this.props;
		const d = this.durationLeft().toObject();
		return <Text style={style}>{`${d.days}d ${d.hours}h ${d.minutes}m ${d.seconds}s`}</Text>;
	}
}
CountDown.propTypes = {
	start: PropTypes.instanceOf(DateTime).isRequired,
	end: PropTypes.instanceOf(DateTime).isRequired,
	callback: PropTypes.func,
};
CountDown.defaultProps = {
	callback: () => {},
};
