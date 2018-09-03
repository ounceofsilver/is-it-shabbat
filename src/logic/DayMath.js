SunCalc = require("suncalc");

function dayData(day, latitude, longitude) {
    // Wrapper to SunCalc
    // I realize how dumb this looks,
    // but if I needed to modify the object returned
    // by SunCalc for whatever reason, this would help.
    var times = SunCalc.getTimes(day, latitude, longitude)
    // modifications, if any
    return times;
}

function nextDayOfWeek(day, dayOfWeek) {
    // 5: Friday, 6: Saturday, 0: Sunday, ...
    var copyOfDay = new Date(day.getTime()); // copies current time
    copyOfDay.setDate(day.getDate() + ((7 + dayOfWeek - day.getDay()) % 7));
    return copyOfDay;
}

module.exports = {
    data: dayData,
    nextOfWeek: nextDayOfWeek,
    ofWeek: {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    }
};
