import { local } from '../../../../../test/jest-framework';
import { HolidayCategory, HolidaySubcat, IHoliday } from '../../../../core/store/holiday';
import {
	getDaysOfOmer,
	getMajorHolidays,
	getMinorHolidays,
	getModernHolidays,
	getRoshChodeshim,
	getSpecialShabbats,
	internal,
} from './holidayFiltering';

const {
	top3Filter,
	upcomingTop3OfCategory,
} = internal;

const roshChodeshimAttributes = { category: HolidayCategory.ROSHCHODESH };
const majorHolidaysAttributes = { category: HolidayCategory.HOLIDAY, subcat: HolidaySubcat.MAJOR };
const minorHolidaysAttributes = { category: HolidayCategory.HOLIDAY, subcat: HolidaySubcat.MINOR };
const specialShabbatsAttributes = {
	category: HolidayCategory.HOLIDAY, subcat: HolidaySubcat.SHABBAT,
};
const modernHolidaysAttributes = {
	category: HolidayCategory.HOLIDAY, subcat: HolidaySubcat.MODERN,
};
const daysOfOmerAttributes = { category: HolidayCategory.OMER };

describe('internal', () => {
	describe('top3Filter', () => {
		it('should filter and keep the top 3 items', () => {
			const output = [
				1, 2, 3, 4, 5,
			].filter(top3Filter);
			expect(output).toEqual([1, 2, 3]);
		});
	});

	describe('upcomingTop3OfCategory', () => {
		it('should filter out past and irrelevant holidays', () => {
			const f = upcomingTop3OfCategory(HolidayCategory.HOLIDAY);
			const output = f([
				{ date: local(2018, 1, 2), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 1), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...daysOfOmerAttributes },
			] as IHoliday[], local(2018, 1 ,2));

			// Keeps future
			expect(output).toContainEqual({ date: local(2018, 1, 3), ...majorHolidaysAttributes });

			// Keeps today
			expect(output).toContainEqual({ date: local(2018, 1, 2), ...majorHolidaysAttributes });

			// Discards yesterday
			expect(output).not.toContainEqual({ date: local(2018, 1, 1), ...majorHolidaysAttributes });

			// Discards irrelevant holidays
			expect(output).not.toContainEqual({ date: local(2018, 1, 3), ...daysOfOmerAttributes });
		});

		it('should sort results by date', () => {
			const f = upcomingTop3OfCategory(HolidayCategory.HOLIDAY);
			const output = f([
				{ date: local(2018, 1, 2), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 4), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 1), ...majorHolidaysAttributes },
			] as IHoliday[], local(2018, 1, 2));

			expect(output).toEqual([
				{ date: local(2018, 1, 2), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 4), ...majorHolidaysAttributes },
			]);
		});

		it('should stop results at top 3', () => {
			const f = upcomingTop3OfCategory(HolidayCategory.HOLIDAY);
			const output = f([
				{ date: local(2018, 1, 2), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 4), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 5), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 6), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 1), ...majorHolidaysAttributes },
			] as IHoliday[], local(2018, 1, 2));

			expect(output).toEqual([
				{ date: local(2018, 1, 2), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 4), ...majorHolidaysAttributes },
			]);
		});
	});
});

describe('base holiday filters', () => {
	describe('getRoshChodeshim', () => {
		it('should getRoshChodeshim', () => {
			const output = getRoshChodeshim([
				{ date: local(2018, 1, 9), ...roshChodeshimAttributes },
				{ date: local(2018, 1, 7), ...roshChodeshimAttributes },
				{ date: local(2018, 1, 2), ...roshChodeshimAttributes },
				{ date: local(2018, 1, 4), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 3), ...roshChodeshimAttributes },
				{ date: local(2018, 1, 1), ...roshChodeshimAttributes },
				{ date: local(2018, 1, 5), ...roshChodeshimAttributes },
			] as IHoliday[],                local(2018, 1, 2));
			expect(output).toEqual([
				{ date: local(2018, 1, 2), ...roshChodeshimAttributes },
				{ date: local(2018, 1, 3), ...roshChodeshimAttributes },
				{ date: local(2018, 1, 5), ...roshChodeshimAttributes },
			]);
		});
	});

	describe('getMajorHolidays', () => {
		it('should basically work', () => {
			const output = getMajorHolidays([
				{ date: local(2018, 1, 9), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 7), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 2), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 4), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 3), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 1), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 5), ...majorHolidaysAttributes },
			] as IHoliday[],                local(2018, 1, 2));

			// sorted by date
			// has only top 3
			// filters out past holidays
			expect(output).toEqual([
				{ date: local(2018, 1, 2), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 5), ...majorHolidaysAttributes },
			]);
		});
	});

	describe('getMinorHolidays', () => {
		it('should getMinorHolidays', () => {
			const output = getMinorHolidays([
				{ date: local(2018, 1, 9), ...minorHolidaysAttributes },
				{ date: local(2018, 1, 7), ...minorHolidaysAttributes },
				{ date: local(2018, 1, 2), ...minorHolidaysAttributes },
				{ date: local(2018, 1, 4), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 3), ...minorHolidaysAttributes },
				{ date: local(2018, 1, 1), ...minorHolidaysAttributes },
				{ date: local(2018, 1, 5), ...minorHolidaysAttributes },
			] as IHoliday[],                local(2018, 1, 2));
			expect(output).toEqual([
				{ date: local(2018, 1, 2), ...minorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...minorHolidaysAttributes },
				{ date: local(2018, 1, 5), ...minorHolidaysAttributes },
			]);
		});
	});

	describe('getSpecialShabbats', () => {
		it('should getSpecialShabbats', () => {
			const output = getSpecialShabbats([
				{ date: local(2018, 1, 9), ...specialShabbatsAttributes },
				{ date: local(2018, 1, 7), ...specialShabbatsAttributes },
				{ date: local(2018, 1, 2), ...specialShabbatsAttributes },
				{ date: local(2018, 1, 4), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 3), ...specialShabbatsAttributes },
				{ date: local(2018, 1, 1), ...specialShabbatsAttributes },
				{ date: local(2018, 1, 5), ...specialShabbatsAttributes },
			] as IHoliday[],                  local(2018, 1, 2));
			expect(output).toEqual([
				{ date: local(2018, 1, 2), ...specialShabbatsAttributes },
				{ date: local(2018, 1, 3), ...specialShabbatsAttributes },
				{ date: local(2018, 1, 5), ...specialShabbatsAttributes },
			]);
		});
	});

	describe('getModernHolidays', () => {
		it('should getModernHolidays', () => {
			const output = getModernHolidays([
				{ date: local(2018, 1, 9), ...modernHolidaysAttributes },
				{ date: local(2018, 1, 7), ...modernHolidaysAttributes },
				{ date: local(2018, 1, 2), ...modernHolidaysAttributes },
				{ date: local(2018, 1, 4), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 3), ...modernHolidaysAttributes },
				{ date: local(2018, 1, 1), ...modernHolidaysAttributes },
				{ date: local(2018, 1, 5), ...modernHolidaysAttributes },
			] as IHoliday[],                 local(2018, 1, 2));
			expect(output).toEqual([
				{ date: local(2018, 1, 2), ...modernHolidaysAttributes },
				{ date: local(2018, 1, 3), ...modernHolidaysAttributes },
				{ date: local(2018, 1, 5), ...modernHolidaysAttributes },
			]);
		});
	});

	describe('getDaysOfOmer', () => {
		it('should getDaysOfOmer', () => {
			const output = getDaysOfOmer([
				{ date: local(2018, 1, 9), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 7), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 2), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 4), ...majorHolidaysAttributes },
				{ date: local(2018, 1, 3), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 1), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 5), ...daysOfOmerAttributes },
			] as IHoliday[],             local(2018, 1, 2));
			expect(output).toEqual([
				{ date: local(2018, 1, 2), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 3), ...daysOfOmerAttributes },
				{ date: local(2018, 1, 5), ...daysOfOmerAttributes },
			]);
		});
	});
});
