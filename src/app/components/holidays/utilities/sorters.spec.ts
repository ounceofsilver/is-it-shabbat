import { local } from '../../../../../test/jest-framework';
import { IHoliday } from '../types';
import { ascending, descending } from './sorters';

describe('sorters', () => {
	describe('ascending', () => {
		it('should sort holidays progressing forward in time', () => {
			const output = [
				{ date: local(2018, 1, 3) } as IHoliday,
				{ date: local(2018, 1, 1) } as IHoliday,
				{ date: local(2018, 1, 2) } as IHoliday,
			].sort(ascending);
			expect(output).toEqual([
				{ date: local(2018, 1, 1) },
				{ date: local(2018, 1, 2) },
				{ date: local(2018, 1, 3) },
			]);
		});
	});

	describe('descending', () => {
		it('should sort holidays progressing backward in time', () => {
			const output = [
				{ date: local(2018, 1, 3) } as IHoliday,
				{ date: local(2018, 1, 1) } as IHoliday,
				{ date: local(2018, 1, 2) } as IHoliday,
			].sort(descending);
			expect(output).toEqual([
				{ date: local(2018, 1, 3) },
				{ date: local(2018, 1, 2) },
				{ date: local(2018, 1, 1) },
			]);
		});
	});
});
