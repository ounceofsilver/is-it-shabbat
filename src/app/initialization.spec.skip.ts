// import * as React from 'react';
// import * as renderer from 'react-test-renderer';

// import { Location, Permissions } from 'expo';
// import { action, utilities } from 'is-it-shabbat-core';
// import { local } from '../test/jest-framework';
// import initialization from './initialization';

// jest.mock('expo');
// jest.mock('is-it-shabbat-core');

// const DEFAULT_COORDS = {
// 	latitude: 31.776875,
// 	longitude: 35.233673,
// };

// const COORDS = {
// 	latitude: 42,
// 	longitude: 73,
// };
// const DATE = local(2018, 12, 25);

// describe.skip('initialization', () => {
// 	it('should use default location', () => {
// 		Permissions.askAsync = jest.fn().mockResolvedValue({ status: 'NOPE' });
// 		utilities.DateTime.local.mockReturnValue(DATE);
// 		initialization();
// 		expect(action.initialize).toHaveBeenCalledTimes(1);
// 		expect(action.initialize).toHaveBeenCalledWith(DATE, expect.objectContaining({
// 			coords: DEFAULT_COORDS,
// 		}));
// 	});

// 	it('should request location', () => {
// 		Permissions.askAsync = jest.fn().mockResolvedValue({ status: 'granted' });
// 		utilities.DateTime.local.mockReturnValue(DATE);
// 		Location.getCurrentPositionAsync = jest.fn().mockResolvedValue({ coords: COORDS });
// 		initialization();
// 		expect(action.initialize).toHaveBeenCalledTimes(1);
// 		expect(action.initialize.mock.calls[0][0]).toEqual(DATE);
// 		expect(action.initialize).toHaveBeenCalledWith(DATE, expect.objectContaining({
// 			coords: DEFAULT_COORDS,
// 		}));
// 	});
// });
