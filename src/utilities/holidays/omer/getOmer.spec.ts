import { local } from '../../../../test/jest-framework';
import { IHoliday } from '../../../holidays/types';
import getOmer, { blessings, getOmerBlessingInfo } from './getOmer';

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
		});

		it('should give null if no omer today', () => {
			const todayOmer = getOmer([], local(2019, 5, 2));
			expect(todayOmer).toBeNull();
		});
	});

	describe('getOmerBlessingInfo', () => {
		it('should basically work', () => {
			expect(getOmerBlessingInfo({ title: '27th day of the omer' })).toEqual({
				dayBlessing: blessings[5], // 6th day of omer week
				dayOf: 27,
				dayOfWeekOf: 6,
				weekBlessing: blessings[3], // 4th omer week
				weekOf: 3,
			});
		});

		it('should give correct blessings for each of the 49 days of the omer', () => {
			for (let i = 0; i < 7; i += 1) {
				const weekBlessing = blessings[i];
				for (let j = 0; j < 7; j += 1) {
					const dayBlessing = blessings[j];

					const o = { title: `${(7 * i) + j + 1}th day of the omer` };
					const info = getOmerBlessingInfo(o);

					expect(info).toEqual({
						dayBlessing,
						dayOf: (7 * i) + j + 1,
						dayOfWeekOf: j + 1,
						// tslint:disable-next-line: object-shorthand-properties-first
						weekBlessing,
						weekOf: i,
					});
				}
			}
		});
	});
});
