import { DateTime } from 'luxon';

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

jest.mock('axios');

import {
	getHolidaysAsync,
	internal,
} from './api';

const { sendHolidayRequestAsync } = internal;

const mockResponse = {
	data: {
		items: [
			{
				category: 'holiday',
				date: '2015-05-23',
				title: 'HOLIDAY',
			}, {
				category: 'hebdate',
				date: '2015-05-23',
				title: 'HEBREW_DATE',
			},
		],
	},
};

const expectedHoliday = {
	...mockResponse.data.items[0],
	date: local(2015, 5, 22),
	hebdate: mockResponse.data.items[1].title,
	yomtov: false,
};

describe('hebcal', () => {
	let mockAxios;
	beforeEach(() => {
		mockAxios = jest.requireMock('axios');
		mockAxios.mockReturnValue(Promise.resolve(mockResponse));
	});
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('sendHolidayRequestAsync', () => {
		it('should make API calls correctly', async () => {
			await sendHolidayRequestAsync(
				local(2018, 11, 1),
				{},
			);
			expect(mockAxios).toHaveBeenCalledTimes(1);
			expect(mockAxios.mock.calls[0][0]).toEqual(expect.objectContaining({
				method: 'get',
				url: 'https://www.hebcal.com/hebcal/',
				params: expect.objectContaining({
					year: 2018,
					month: 11,

					// Critical defaults
					D: 'on',
				}),
			}));
		});

		it('should allow API setting overrides', async () => {
			await sendHolidayRequestAsync(
				local(2018, 11, 1),
				{ i: 'on' },
			);
			expect(mockAxios.mock.calls[0][0].params).toEqual(expect.objectContaining({
				i: 'on',
			}));
		});
	});

	describe('getHolidaysAsync', () => {
		it('should return empty if 0 months', async () => {
			const holidays = await getHolidaysAsync(
				local(2018, 11, 1),
				0,
			);
			expect(holidays).toEqual([]);
		});

		it('should collate holidays and hebdates', async () => {
			const holidays = await getHolidaysAsync(
				local(2018, 11, 1),
				1,
			);
			expect(holidays).toEqual([
				expectedHoliday,
			]);
		});

		it('should collect holidays over multiple months/API calls', async () => {
			const holidays = await getHolidaysAsync(
				local(2018, 11, 1),
				3,
			);
			expect(mockAxios).toHaveBeenCalledTimes(3);
			expect(mockAxios.mock.calls[0][0].params).toEqual(expect.objectContaining({
				year: 2018,
				month: 11,
			}));
			expect(mockAxios.mock.calls[1][0].params).toEqual(expect.objectContaining({
				year: 2018,
				month: 12,
			}));
			expect(mockAxios.mock.calls[2][0].params).toEqual(expect.objectContaining({
				year: 2019,
				month: 1,
			}));
			expect(holidays).toEqual([
				expectedHoliday,
				expectedHoliday,
				expectedHoliday,
			]);
		});
	});
});
