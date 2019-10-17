import { combineReducers } from 'redux';

import config from './config';
import error from './error';
import holiday from './holiday';

const rootReducer = combineReducers({
	// selectors expect these keys; rename carefully
	config,
	holiday,
	error,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
