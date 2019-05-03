import getOmer, { blessings, getOmerBlessingInfo } from './getOmer';

const today = local(2019, 5, 2);
const omerToday = { category: 'omer', date: today, title: '13th day of the Omer' };
const holidays = [
	omerToday,
	{ category: 'NOTomer', date: today.minus({ days: 1 }) },
	{ category: 'NOTomer', date: today.plus({ days: 1 }) },
	{ category: 'omer', date: today.minus({ days: 1 }) },
	{ category: 'omer', date: today.plus({ days: 1 }) },
];

describe('getOmer', () => {
	it('should only use today', () => {
		const todayOmer = getOmer(holidays, today);
		expect(todayOmer).to.deep.equal({
			...omerToday,
			...(getOmerBlessingInfo(omerToday)),
		});
	});

	it('should give undefined if no omer today', () => {
		const todayOmer = getOmer(holidays, today.plus({ days: 20 }));
		expect(todayOmer).to.be.undefined();
	});

	describe('getOmerBlessingInfo', () => {
		it('should basically work', () => {
			expect(getOmerBlessingInfo({ title: '27th day of the omer' })).to.deep.equal({
				dayOf: 27,
				dayBlessing: blessings[5], // 6th day of omer week
				weekBlessing: blessings[3], // 4th omer week

				weekOf: 4,
				dayOfWeekOf: 6,
			});
		});

		it('should give correct blessings for each of the 49 days of the omer', () => {
			for (let i = 0; i < 7; i += 1) {
				const weekBlessing = blessings[i];
				for (let j = 0; j < 7; j += 1) {
					const dayBlessing = blessings[j];

					const o = { title: `${(7 * i) + j + 1}th day of the omer` };
					const info = getOmerBlessingInfo(o);

					expect(info).to.deep.equal({
						dayOf: (7 * i) + j + 1,
						dayBlessing,
						weekBlessing,

						weekOf: i + 1,
						dayOfWeekOf: j + 1,
					});
				}
			}
		});
	});
});
