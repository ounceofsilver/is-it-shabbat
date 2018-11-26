import React, {
	Component,
} from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

import Shabbat from '../logic/Shabbat';

export default class ShabbatCheck extends Component {
	render() {
		const { now, location, children } = this.props;
		if (!location) {
			return null;
		}
		const { coords: { latitude, longitude } } = location;
		const { period, countDownTo } = Shabbat.isItShabbat(now, latitude, longitude);
		return children(period, countDownTo);
	}
}
ShabbatCheck.propTypes = {
	now: PropTypes.instanceOf(DateTime).isRequired,
	location: PropTypes.shape({
		coords: PropTypes.shape({
			latitude: PropTypes.number,
			longitude: PropTypes.number,
		}),
	}).isRequired,
	children: PropTypes.func.isRequired,
};
