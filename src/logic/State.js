import {
	createStore,
} from 'redux';
import { DateTime } from 'luxon';

const defaultState = {
	location: null,
	now: DateTime.local(),
};
const userState = createStore((state = defaultState, action) => {
	if (action.type === 'SET_LOCATION') {
		return Object.assign({}, state, { location: action.location });
	} if (action.type === 'SET_NOW') {
		return Object.assign({}, state, { now: action.now });
	}
	return state;
});
module.exports = {
	user: userState,
	set: {
		now: (now) => {
			userState.dispatch({
				type: 'SET_NOW',
				now,
			});
		},
	},
};
