import createStore from '..';
import { clearError, setError } from './actions';
import { getError } from './selectors';

describe('error', () => {
	const error1 = 'error1';
	const localizedError1 = 'localizedError1';
	const translator1 = () => localizedError1;

	describe('message get/set', () => {
		it('should update message', () => {
			const { dispatch, getState } = createStore();

			// Initially, no error
			expect(getError(getState())).toBeUndefined();

			// Action changes state
			dispatch(setError(error1));
			expect(getError(getState())).toBe(error1);
		});

		it('should clear message and flags', () => {
			const { dispatch, getState } = createStore();
			dispatch(setError(error1, true));
			dispatch(clearError());
			expect(getError(getState(), translator1)).toBeUndefined();
		});

		it('should consider localization if translator provided', () => {
			const { dispatch, getState } = createStore();

			dispatch(setError(error1, true));
			expect(getError(getState(), translator1)).toBe(localizedError1);
		});

		it('should not translate if message is not localized', () => {
			const { dispatch, getState } = createStore();

			dispatch(setError(error1, false));
			expect(getError(getState(), translator1)).toBe(error1);
		});
	});
});
