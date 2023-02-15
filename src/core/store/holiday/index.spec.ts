jest.mock('./api', () => ({
	getHolidaysAsync: jest.fn(),
}));

import createStore from '..';
import { getHolidays, setHolidayOptions } from './actions';
import { accessHolidays, getHolidayOptions, getHolidayRequestState } from './selectors';
import { HolidayCategory, HolidaySubcat, IHoliday, IHolidayOptions, RequestState } from './types';

import { DateTime } from 'luxon';
import { getError } from '../error';
import { IHebcalOptions } from './api';
import { mapOptions } from './utilities';

export const local = (
	y?: number,
	m?: number,
	d?: number,
	h: number = 0,
	min: number = 0,
	s: number = 0,
	ms: number = 0,
) =>
	DateTime.fromObject({
		day: d,
		hour: h,
		millisecond: ms,
		minute: min,
		month: m,
		second: s,
		year: y,
		zone: 'America/New_York',
	});

describe('holidays', () => {
	let getHolidaysAsync;
	let resolveGetHolidaysAsync;
	let rejectGetHolidaysAsync;
	let promiseGetHolidaysAsync;
	beforeEach(() => {
		getHolidaysAsync = jest.requireMock('./api').getHolidaysAsync;
		resolveGetHolidaysAsync = rejectGetHolidaysAsync = undefined;
		promiseGetHolidaysAsync = new Promise((_resolve, _reject) => {
			resolveGetHolidaysAsync = _resolve;
			rejectGetHolidaysAsync = _reject;
		});
		getHolidaysAsync.mockReturnValue(promiseGetHolidaysAsync);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	const allHolidayOptions: IHolidayOptions = {
		major: true,
		minor: true,
		roshChodeshim: true,
		modern: true,
		specialShabbatim: true,
		hillel: true,
		fasts: true,
	};
	const mappedAllHolidayOptions: IHebcalOptions = mapOptions(allHolidayOptions);
	const defaultHolidayOptions: IHolidayOptions = {
		major: true,
		minor: false,
		modern: false,
		roshChodeshim: true,
		specialShabbatim: false,
		fasts: false,
		hillel: true,
		// TODO(jafulfor): code to handle being in Israel?
	};

	const holiday1: IHoliday = {
		title: 'Some Sukkot',
		date: local(2019, 10, 18),
		category: HolidayCategory.HOLIDAY,
		subcat: HolidaySubcat.MAJOR,
		yomtov: false,
	};

	const now = local(2019, 10, 17);
	const months = 3;

	describe('options', () => {
		it('should get/set holiday options', () => {
			const { getState, dispatch } = createStore();

			// initial state
			expect(getHolidayOptions(getState())).toEqual(defaultHolidayOptions);

			dispatch(setHolidayOptions(allHolidayOptions));
			expect(getHolidayOptions(getState())).toEqual(allHolidayOptions);
		});
	});

	describe('holidays', () => {
		it('should get holidays successfully', async () => {
			const { getState, dispatch } = createStore();

			// initial state
			expect(accessHolidays(getState())).toEqual([]);
			expect(getHolidayRequestState(getState())).toBe(RequestState.NOSTART);
			expect(getHolidaysAsync).not.toHaveBeenCalled();

			// Trigger request
			getHolidays(now, months, allHolidayOptions)(dispatch);

			// In-flight state
			expect(accessHolidays(getState())).toEqual([]);
			expect(getHolidayRequestState(getState())).toBe(RequestState.WAITING);
			expect(getHolidaysAsync).toHaveBeenCalledTimes(1);
			expect(getHolidaysAsync).toHaveBeenCalledWith(now, months, mappedAllHolidayOptions);

			resolveGetHolidaysAsync([holiday1]);
			await promiseGetHolidaysAsync;

			// After successful request
			expect(accessHolidays(getState())).toEqual([holiday1]);
			expect(getHolidayRequestState(getState())).toBe(RequestState.SUCCESS);
			expect(getHolidaysAsync).toHaveBeenCalledTimes(1); // should not be called again
		});

		it('should handle errors', async () => {
			expect.assertions(4);
			const { getState, dispatch } = createStore();

			// Trigger request
			getHolidays(now, months, allHolidayOptions)(dispatch);

			const error1 = 'error1';
			rejectGetHolidaysAsync(error1);
			try {
				await promiseGetHolidaysAsync.catch();
			} catch {
				// Assuming the action's `catch` has completed

				// No holidays (no update)
				expect(accessHolidays(getState())).toEqual([]);

				// Failure state and sets error
				expect(getHolidayRequestState(getState())).toBe(RequestState.FAILURE);
				expect(getError(getState())).toBe(error1);

				// should not call again
				expect(getHolidaysAsync).toHaveBeenCalledTimes(1);
			}
		});
	});
});
