import createStore from '..';
import { setLocation } from './actions';
import { getLocation, getTimezone } from './selectors';

describe('config', () => {
	const location1 = { coords: {
		latitude: 31.776875,
		longitude: 35.233673,
	} };
	const timezone1 = 'Asia/Jerusalem';

	describe('location get/set', () => {
		it('should update location', () => {
			const { dispatch, getState } = createStore();

			// Initially, no location
			expect(getLocation(getState())).toBeUndefined();

			// Action changes state
			dispatch(setLocation(location1));
			expect(getLocation(getState())).toEqual(location1);
		});
	});

	describe('getTimezone', () => {
		it('should get timezone if location is set', () => {
			const { dispatch, getState } = createStore();

			expect(getTimezone(getState())).toBeUndefined();

			dispatch(setLocation(location1));
			expect(getTimezone(getState())).toBe(timezone1);
		});
	});
});
