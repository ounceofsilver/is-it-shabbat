import { action } from 'is-it-shabbat-core';
import { DateTime } from 'luxon';
import React from 'react';
import { connect } from 'react-redux';

import { CenteredContainer } from '../../Styles';
import { Holiday } from './Holiday';
import { IHoliday } from './types';
import { getMajorHolidays } from './utilities/holidayFiltering';

export const PureHolidays = ({
	holidays,
	now,
	dispatch,
}: {
	holidays: IHoliday[],
	now: DateTime,
	dispatch: (action: any) => void,
}) => {
	const setNow = end => dispatch(action.setNow(end));
	return (
		getMajorHolidays(holidays, now)
			.map(
				holiday => (
					<CenteredContainer key={holiday.date.toString()} style={{ marginBottom: 15 }}>
						<Holiday holiday={holiday} setNow={setNow} now={now} />
					</CenteredContainer>
				),
			)
	);
};

export default connect(
	state => ({
		holidays: state.holidays,
		now: state.now,
	}),
)(PureHolidays);
