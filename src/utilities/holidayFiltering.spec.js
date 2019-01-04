import holidayFiltering from './holidayFiltering';

const sampleInput = [
	{ date: local(2018, 1, 9) },
	{ date: local(2018, 1, 7) },
	{ date: local(2018, 1, 2) },
	{ date: local(2018, 1, 4) },
	{ date: local(2018, 1, 3) },
	{ date: local(2018, 1, 1) },
	{ date: local(2018, 1, 5) },
];

describe('holidayFiltering', () => {
	it('should filter, sort, and take top 3', () => {
		const output = holidayFiltering(
			sampleInput,
			local(2018, 1, 2),
		);

		// sorted by date
		// has only top 3
		// filters out past holidays
		expect(output).to.deep.equal([
			{ date: local(2018, 1, 3) },
			{ date: local(2018, 1, 4) },
			{ date: local(2018, 1, 5) },
		]);
	});

	it('should handle empty list', () => {
		const output = holidayFiltering(
			[],
			local(2018, 1, 2),
		);
		expect(output).to.deep.equal([]);
	});
});
