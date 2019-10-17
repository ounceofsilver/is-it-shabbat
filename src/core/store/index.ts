import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import config from './config/reducer';
import error from './error/reducer';
import holiday from './holiday/reducer';

export const rootReducer = combineReducers({
	// selectors expect these keys; rename carefully
	config,
	holiday,
	error,
});

export type AppState = ReturnType<typeof rootReducer>;

export default (...middlewares) => {
	return createStore(
		rootReducer,
		compose(
			applyMiddleware(thunk),
			...middlewares,
		),
	);
};
