import { DateTime } from 'luxon';
import React from 'react';
import { connect } from 'react-redux';

import { IHoliday } from '../../../core/models/holidays';
import { getHolidays } from '../../../core/store/get';
import { AppState } from '../../../core/store/use';
import { useTime } from '../../time';
import { Holiday } from './Holiday';
import {
	getDaysOfOmer,
	getMajorHolidays,
	getMinorHolidays,
	getModernHolidays,
	getRoshChodeshim,
	getSpecialShabbats,
} from './utilities/holidayFiltering';

const HolidaysComponentFactory = (
	filter: (holidays: IHoliday[], now: DateTime) => IHoliday[],
): () => any => {

	return connect(
		(state: AppState) => ({ holidays: getHolidays(state) }),
	)(({ holidays }) => {

		// How frequently to re-filter holidays?
		const now = useTime(60 * 1000);

		if (!holidays) {
			return null;
		}

		const filteredHolidays = filter(holidays, now);

		return (
			filteredHolidays
				.map(
					(holiday: IHoliday) => (<Holiday
						key={holiday.date.toString()}
						holiday={holiday}
					/>),
				)
		);

	});
};

export const RoshChodeshim = HolidaysComponentFactory(getRoshChodeshim);
export const MajorHolidays = HolidaysComponentFactory(getMajorHolidays);
export const MinorHolidays = HolidaysComponentFactory(getMinorHolidays);
export const SpecialShabbats = HolidaysComponentFactory(getSpecialShabbats);
export const ModernHolidays = HolidaysComponentFactory(getModernHolidays);
export const DaysOfOmer = HolidaysComponentFactory(getDaysOfOmer);
