import { combineReducers, createStore } from 'redux';

import config from './config/reducer';
import error from './error/reducer';
import holiday from './holiday/reducer';

export const rootReducer = combineReducers({
	// selectors expect these keys; rename carefully
	config,
	holiday,
	error,
});

export default () => createStore(rootReducer);
export type AppState = ReturnType<typeof rootReducer>;
