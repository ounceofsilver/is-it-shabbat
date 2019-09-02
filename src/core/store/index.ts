import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './use';

export default (...middlewares) => {
	return createStore(
		rootReducer,
		compose(
			applyMiddleware(thunk),
			...middlewares,
		),
	);
};
