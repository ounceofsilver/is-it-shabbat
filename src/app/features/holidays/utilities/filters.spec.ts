import { local } from '../../../../../test/jest-framework';
import { HolidayCategory, HolidaySubcat, IHoliday } from '../../../../core/store/holiday';
import { categoryFilter, topNFilter, upcomingFilter } from './filters';

describe('filters', () => {
	describe('upcomingFilter', () => {
		it('should keep all holidays with `date` in the future', () => {
			const output = [
				{ date: local(2019, 5, 1) } as IHoliday, // gone
				{ date: local(2019, 5, 2) } as IHoliday, // keep, equals
				{ date: local(2019, 5, 3) } as IHoliday, // keep
			].filter(upcomingFilter(local(2019, 5, 2)));

			expect(output).toEqual([
				{ date: local(2019, 5, 2) },
				{ date: local(2019, 5, 3) },
			]);
		});
	});

	describe('categoryFilter', () => {
		it('should keep holidays with given `category`', () => {
			const output = [
				{ category: HolidayCategory.HOLIDAY } as IHoliday,
				{ category: HolidayCategory.OMER, title: 'id' } as IHoliday,
				{ category: HolidayCategory.ROSHCHODESH } as IHoliday,
			].filter(categoryFilter(HolidayCategory.OMER));

			expect(output).toEqual([{ category: HolidayCategory.OMER, title: 'id' }]);
		});

		it('should keep holidays with given `category` and `subcategory`', () => {
			const output = [
				{ category: HolidayCategory.HOLIDAY, subcat: HolidaySubcat.MAJOR, title: 'id' } as IHoliday,
				{ category: HolidayCategory.HOLIDAY, subcat: HolidaySubcat.MINOR } as IHoliday,
				{ category: HolidayCategory.HOLIDAY, subcat: HolidaySubcat.MODERN } as IHoliday,
				{ category: HolidayCategory.OMER, subcat: HolidaySubcat.MODERN } as IHoliday,
			].filter(categoryFilter(HolidayCategory.HOLIDAY, HolidaySubcat.MAJOR));

			expect(output).toEqual([{
				category: HolidayCategory.HOLIDAY, subcat: HolidaySubcat.MAJOR, title: 'id',
			}]);
		});
	});

	describe('topNFilter', () => {
		it('should keep the top N items if too many', () => {
			const output = [
				1, 2, 3, 4, 5,
			].filter(topNFilter(2));
			expect(output).toEqual([1, 2]);
		});

		it('should give input if less than N items', () => {
			const input = [1, 2, 3, 4, 5];
			const output = input.filter(topNFilter(20));
			expect(output).toEqual(input);
		});
	});
});
