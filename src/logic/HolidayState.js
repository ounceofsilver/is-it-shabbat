import {
	createStore,
} from 'redux';
import { DateTime } from 'luxon';


const defaultState = {
	holidays: [],
	lastMonthRequested: DateTime.local().month,
	lastYearRequested: DateTime.local().year,
};
const store = createStore((state = defaultState, action) => {
	if (action.type === 'SET_HOLIDAYS') {
		return Object.assign({}, state, {
			holidays: action.holidays,
			lastMonthRequested: action.lastMonthRequested,
			lastYearRequested: action.lastYearRequested,
		});
	}
	return state;
});

const set = {
	holidays: (holidays, dateTimeRequested) => store.dispatch({
		type: 'SET_HOLIDAYS',
		holidays,
		lastMonthRequested: dateTimeRequested.month,
		lastYearRequested: dateTimeRequested.year,
	}),
};

module.exports = {
	state: store,
	set,
};
