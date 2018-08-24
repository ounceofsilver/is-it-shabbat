import {
    createStore
} from 'redux';

defaultState = {
    location: null,
    // now: new Date("8/22/2018 07:00:00"),  //                     NOT_SHABBAT
    // now: new Date("8/24/2018 14:00:00"),  // Friday,             NOT_SHABBAT
    // now: new Date("8/24/2018 19:13:30"),  // Friday,             NOT_SHABBAT => CANDLELIGHTING
    // now: new Date("8/24/2018 19:22:30"),  // Friday,             CANDLELIGHTING
    // now: new Date("8/24/2018 19:31:30"),  // Friday,             CANDLELIGHTING => SHABBAT
    // now: new Date("8/24/2018 21:00:00"),  // Friday,             SHABBAT
    // now: new Date("8/24/2018 23:59:55"),  // Friday => Saturday, SHABBAT
    // now: new Date("8/25/2018 14:00:00"),  // Saturday,           SHABBAT
    // now: new Date("8/25/2018 20:14:55"),  // Saturday,           SHABBAT => NOT_SHABBAT
    // now: new Date("8/25/2018 21:00:00"),  // Saturday,           NOT_SHABBAT

    now: new Date(),  // Actual time
}
var userState = createStore(function (state = defaultState, action) {
    if(action.type == "SET_LOCATION") {
        return Object.assign({}, state, {location: action.location});
    } else if (action.type == "SET_NOW") {
        return Object.assign({}, state, {now: action.now})
    } else {
        return state;
    }
});
module.exports = {
    user: userState,
}
