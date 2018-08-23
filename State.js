import {
    createStore
} from 'redux';

defaultState = {
    location: null,
    now: new Date("8/24/2018 18:00:00"),
}
var userState = createStore(function (state = defaultState, action) {
    if(action.type == "SET_LOCATION") {
        return Object.assign({}, state, {location: action.location});
    } else {
        return state;
    }
});
module.exports = {
    user: userState,
}
