import {
    createStore
} from 'redux';

defaultState = {
    location: null,
    now: new Date(),  // Actual time
}
var userState = createStore(function (state = defaultState, action) {
    if(action.type === "SET_LOCATION") {
        return Object.assign({}, state, {location: action.location});
    } else if (action.type === "SET_NOW") {
        return Object.assign({}, state, {now: action.now})
    } else {
        return state;
    }
});
module.exports = {
    user: userState,
    set: {
        now: (now) => {
            userState.dispatch({
                type: "SET_NOW",
                now: now,
            })
        }
    }
}
