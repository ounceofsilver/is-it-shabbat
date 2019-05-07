import { action } from 'is-it-shabbat-core';
import { DateTime } from 'luxon';
// tslint:disable-next-line: import-name
import React from 'react';
import { connect } from 'react-redux';

import { Holiday } from './Holiday';
import { IHoliday } from './types';
import {
	getDaysOfOmer,
	getMajorHolidays,
	getMinorHolidays,
	getModernHolidays,
	getRoshChodeshim,
	getSpecialShabbats,
} from './utilities/holidayFiltering';

interface IHolidaysProps {
	holidays: IHoliday[];
	now: DateTime;
	dispatch: (action: any) => void;
}

const HolidaysComponentFactory = (
	filter: (holidays: IHoliday[], now: DateTime) => IHoliday[],
): () => any => connect(
	({ holidays, now }) => ({ holidays, now }),
)(({ holidays, now, dispatch }: IHolidaysProps) => {
	const setNow = end => dispatch(action.setNow(end));
	return (
		filter(holidays, now)
			.map(
				(holiday: IHoliday) => (<Holiday
					key={holiday.date.toString()}
					holiday={holiday}
					setNow={setNow}
					now={now}
				/>),
			)
	);
});

export const RoshChodeshim = HolidaysComponentFactory(getRoshChodeshim);
export const MajorHolidays = HolidaysComponentFactory(getMajorHolidays);
export const MinorHolidays = HolidaysComponentFactory(getMinorHolidays);
export const SpecialShabbats = HolidaysComponentFactory(getSpecialShabbats);
export const ModernHolidays = HolidaysComponentFactory(getModernHolidays);
export const DaysOfOmer = HolidaysComponentFactory(getDaysOfOmer);
