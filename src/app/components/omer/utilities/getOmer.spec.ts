import { local } from '../../../../../test/jest-framework';
import { IHoliday } from '../../../../core/models/holidays';
import getOmer, {
	blessingExplanations,
	blessings,
	getOmerBlessingInfo,
	weeksAndDays,
} from './getOmer';

describe('omer logic', () => {
	const yesterdaySunset = local(2019, 5, 1, 18); // 6:00pm
	const duringDay = local(2019, 5, 2, 12); // noon
	const tonightSunset = local(2019, 5, 2, 19); // 7:00pm (worst case is days are getting longer)
	const afterSunset = local(2019, 5, 2, 20); // 8:00pm

	const yesterdayOmer = { category: 'omer', date: yesterdaySunset, title: '13th day of the Omer' };
	const tonightOmer = { category: 'omer', date: tonightSunset, title: '14th day of the Omer' };
	const omers = [yesterdayOmer, tonightOmer];

	describe('getOmer', () => {
		it('should use yesterday when checking during the day', () => {
			const todayOmer = getOmer(omers as IHoliday[], duringDay);
			expect(todayOmer).toEqual({
				...yesterdayOmer,
				...(getOmerBlessingInfo(yesterdayOmer)),
			});
		});

		it('should use yesterday when checking just before sunset', () => {
			// To make sure we look behind by more than 24 hours
			// because the days might be getting longer at this time of year.
			const todayOmer = getOmer(omers as IHoliday[], tonightSunset.minus({ minutes: 1 }));
			expect(todayOmer).toEqual({
				...yesterdayOmer,
				...(getOmerBlessingInfo(yesterdayOmer)),
			});
		});

		it('should use today when checking after sunset', () => {
			const todayOmer = getOmer(omers as IHoliday[], afterSunset);
			expect(todayOmer).toEqual({
				...tonightOmer,
				...(getOmerBlessingInfo(tonightOmer)),
			});
			expect(todayOmer).not.toEqual(expect.objectContaining({
				...yesterdayOmer,
			}));
		});

		it('should give null if no omer today', () => {
			const todayOmer = getOmer([], local(2019, 5, 2));
			expect(todayOmer).toBeNull();
		});
	});

	// Test day data inference functionality
	describe('getOmerBlessingInfo', () => {
		it('should infer number, weeks, and days', () => {
			expect(getOmerBlessingInfo({ title: '1st day of the omer' })).toEqual(expect.objectContaining({
				dayOf: 1,
				dayOfWeekOf: 1,
				weekOf: 0,
			}));
			expect(getOmerBlessingInfo({ title: '2nd day of the omer' })).toEqual(expect.objectContaining({
				dayOf: 2,
				dayOfWeekOf: 2,
				weekOf: 0,
			}));
			expect(getOmerBlessingInfo({ title: '6th day of the omer' })).toEqual(expect.objectContaining({
				dayOf: 6,
				dayOfWeekOf: 6,
				weekOf: 0,
			}));
			expect(getOmerBlessingInfo({ title: '7th day of the omer' })).toEqual(expect.objectContaining({
				dayOf: 7,
				dayOfWeekOf: 0,
				weekOf: 1,
			}));
			expect(getOmerBlessingInfo({ title: '8th day of the omer' })).toEqual(expect.objectContaining({
				dayOf: 8,
				dayOfWeekOf: 1,
				weekOf: 1,
			}));
		});

		it('should give correct blessings and explanations', () => {
			expect(getOmerBlessingInfo({ title: '1st day of the omer' })).toEqual(expect.objectContaining({
				dayBlessing: blessings[0],
				dayBlessingExplanation: blessingExplanations[0],
				weekBlessing: blessings[0],
				weekBlessingExplanation: blessingExplanations[0],
			}));
			expect(getOmerBlessingInfo({ title: '2nd day of the omer' })).toEqual(expect.objectContaining({
				dayBlessing: blessings[1],
				dayBlessingExplanation: blessingExplanations[1],
				weekBlessing: blessings[0],
				weekBlessingExplanation: blessingExplanations[0],
			}));
			expect(getOmerBlessingInfo({ title: '7th day of the omer' })).toEqual(expect.objectContaining({
				dayBlessing: blessings[6],
				dayBlessingExplanation: blessingExplanations[6],
				weekBlessing: blessings[0],
				weekBlessingExplanation: blessingExplanations[0],
			}));
			expect(getOmerBlessingInfo({ title: '8th day of the omer' })).toEqual(expect.objectContaining({
				dayBlessing: blessings[0],
				dayBlessingExplanation: blessingExplanations[0],
				weekBlessing: blessings[1],
				weekBlessingExplanation: blessingExplanations[1],
			}));
			expect(getOmerBlessingInfo({ title: '9th day of the omer' })).toEqual(expect.objectContaining({
				dayBlessing: blessings[1],
				dayBlessingExplanation: blessingExplanations[1],
				weekBlessing: blessings[1],
				weekBlessingExplanation: blessingExplanations[1],
			}));
		});
	});

	// Test view functionality
	describe('weeksAndDays', () => {
		// Assuming the inputs are correct, it should display output properly
		it('should work for 1 days', () => {
			expect(weeksAndDays(1, 1, 0)).toBe('1 day');
		});
		it('should work for 2 days', () => {
			expect(weeksAndDays(2, 2, 0)).toBe('2 days');
		});
		it('should work for 7 days, which is 1 week', () => {
			expect(weeksAndDays(7, 0, 1)).toBe('7 days, which is 1 week');
		});
		it('should work for 8 days, which is 1 week and 1 day', () => {
			expect(weeksAndDays(8, 1, 1)).toBe('8 days, which is 1 week and 1 day');
		});
		it('should work for 9 days, which is 1 week and 2 days', () => {
			expect(weeksAndDays(9, 2, 1)).toBe('9 days, which is 1 week and 2 days');
		});
		it('should work for 14 days, which is 2 weeks', () => {
			expect(weeksAndDays(14, 0, 2)).toBe('14 days, which is 2 weeks');
		});
		it('should work for 15 days, which is 2 weeks and 1 day', () => {
			expect(weeksAndDays(15, 1, 2)).toBe('15 days, which is 2 weeks and 1 day');
		});
		it('should work for 16 days, which is 2 weeks and 2 days', () => {
			expect(weeksAndDays(16, 2, 2)).toBe('16 days, which is 2 weeks and 2 days');
		});
	});

	// end-to-end functionality checking
	it('should work together on day 27', () => {
		const o = getOmerBlessingInfo({ title: '27th day of the omer' });
		expect(weeksAndDays(
			o.dayOf, o.dayOfWeekOf, o.weekOf,
		)).toBe('27 days, which is 3 weeks and 6 days');
	});

	it('should work together on day 28', () => {
		const o = getOmerBlessingInfo({ title: '28th day of the omer' });
		expect(weeksAndDays(o.dayOf, o.dayOfWeekOf, o.weekOf)).toBe('28 days, which is 4 weeks');
	});
});
