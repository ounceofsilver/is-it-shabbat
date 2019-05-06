import { local } from '../../../test/jest-framework';
import { IHoliday } from '../../holidays/types';
import { getMajorHolidays, internal } from './holidayFiltering';

const {
	top3Filter,
	upcomingTop3OfCategory,
} = internal;

const major = { category: 'holiday', subcat: 'major' };

const sampleInput = [
	{ date: local(2018, 1, 9) },
	{ date: local(2018, 1, 7) },
	{ date: local(2018, 1, 2) },
	{ date: local(2018, 1, 4) },
	{ date: local(2018, 1, 3) },
	{ date: local(2018, 1, 1) },
	{ date: local(2018, 1, 5) },
];

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
		// upcomingTop3OfCategory
	});
});

describe('getMajorHolidays', () => {
	it('should basically work', () => {
		const majorAttributes = { category: 'holiday', subcat: 'major' };
		const output = getMajorHolidays(
			[
				{ date: local(2018, 1, 9), ...majorAttributes },
				{ date: local(2018, 1, 7), ...majorAttributes },
				{ date: local(2018, 1, 2), ...majorAttributes },
				{ date: local(2018, 1, 4), ...majorAttributes },
				{ date: local(2018, 1, 3), ...majorAttributes },
				{ date: local(2018, 1, 1), ...majorAttributes },
				{ date: local(2018, 1, 5), ...majorAttributes },
			] as IHoliday[],
			local(2018, 1, 2),
		);

		// sorted by date
		// has only top 3
		// filters out past holidays
		expect(output).toEqual([
			{ date: local(2018, 1, 2), ...major },
			{ date: local(2018, 1, 3), ...major },
			{ date: local(2018, 1, 4), ...major },
		]);
	});

	// it('should handle empty list', () => {
	// 	const output = holidayFiltering(
	// 		[],
	// 		local(2018, 1, 2),
	// 	);
	// 	expect(output).to.deep.equal([]);
	// });
});
