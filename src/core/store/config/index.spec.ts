import createStore from '..';
import { setLocation } from './actions';
import { getLocation } from './selectors';

describe('config', () => {
	const location1 = { coords: {
		latitude: 31.776875,
		longitude: 35.233673,
	} };

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
});
