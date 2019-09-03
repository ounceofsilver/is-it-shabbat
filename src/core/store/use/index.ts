import { combineReducers } from 'redux';

import config from './config';
import error from './error';
import holiday from './holiday';

const rootReducer = combineReducers({
	config,
	holiday,
	error,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
