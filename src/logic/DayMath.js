const SunCalc = require("suncalc");

function sunset(day, latitude, longitude) {
	const o = day.toObject();
    const sunset = SunCalc.getTimes(new Date(o.year, o.month - 1, o.day), latitude, longitude).sunset;
	return day.set({
		hour: sunset.getHours(),
		minute: sunset.getMinutes(),
		second: sunset.getSeconds(),
	})
}

function nextDayOfWeek(day, dayOfWeek) {
	const setted = day.set({ weekday: dayOfWeek });
    if(day.weekday > dayOfWeek) {
        return setted.plus({ days: 7 });
    } else {
        return setted;
    }
}

module.exports = {
    sunset: sunset,
    nextOfWeek: nextDayOfWeek,
    ofWeek: {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
		Sunday: 7,
    }
};
