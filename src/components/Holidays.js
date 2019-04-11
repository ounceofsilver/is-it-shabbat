import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	action,
	utilities,
} from 'is-it-shabbat-core';

import { CenteredContainer } from '../Styles';
import filterHolidays from '../utilities/holidayFiltering';

import { Holiday, holidayPropType } from './Holiday';

const { DateTime } = utilities;


export const PureHolidays = ({ holidays, now, dispatch }) => {
	const setNow = end => dispatch(action.setNow(end));
	return (
		filterHolidays(holidays, now)
			.map(
				holiday => (
					<CenteredContainer key={holiday.date.toString()} style={{ marginBottom: 15 }}>
						<Holiday holiday={holiday} setNow={setNow} now={now} />
					</CenteredContainer>
				),
			)
	);
};

PureHolidays.propTypes = {
	now: PropTypes.instanceOf(DateTime).isRequired,
	holidays: PropTypes.arrayOf(holidayPropType).isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default connect(
	state => ({
		now: state.now,
		holidays: state.holidays,
	}),
)(PureHolidays);
