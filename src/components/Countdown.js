import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

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
		const d = this.durationLeft().toObject();
		const { children } = this.props;
		return children(d);
	}
}
CountDown.propTypes = {
	start: PropTypes.instanceOf(DateTime).isRequired,
	end: PropTypes.instanceOf(DateTime).isRequired,
	callback: PropTypes.func,
	children: PropTypes.func,
};
CountDown.defaultProps = {
	callback: () => {},
	children: () => {},
};
