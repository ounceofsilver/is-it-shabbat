import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
	components,
	action,
	utilities,
} from 'is-it-shabbat-core';

import ToggleThroughStates from './ToggleThroughStates';
import {
	SubtitleText,
	SecondaryText,
	CenteredContainer,
} from '../Styles';
import filterHolidays from '../utilities/holidayFiltering';

const { CountDown } = components;
const { DateTime, formatHolidayDuration } = utilities;

export const Holiday = ({
	holiday: { title, date }, now, setNow,
}) => (
	<>
	<SecondaryText>
		{title}
	</SecondaryText>
	<ToggleThroughStates>
		{[
			(
				<CountDown
					key={1}
					end={date}
					start={now}
					callback={setNow}
				>
					{dur => (
						<SubtitleText>
							{formatHolidayDuration(dur)}
						</SubtitleText>
					)}
				</CountDown>
			),
			(
				<SubtitleText key={2}>
					{date.toLocaleString({
						weekday: 'long',
						month: 'short',
						day: '2-digit',
						hour: '2-digit',
						minute: '2-digit',
					})}
				</SubtitleText>
			),
		]}
	</ToggleThroughStates>
	</>
);
const holidayPropType = PropTypes.shape({
	title: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(DateTime).isRequired,
});
Holiday.propTypes = {
	holiday: holidayPropType,
	now: PropTypes.instanceOf(DateTime).isRequired,
	setNow: PropTypes.func,
};
Holiday.default = {
	setNow: () => {},
};

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
