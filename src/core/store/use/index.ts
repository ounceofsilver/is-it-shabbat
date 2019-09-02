import { combineReducers } from 'redux';

import config from './config';
import holiday from './holiday';

const rootReducer = combineReducers({
	config,
	holiday,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
