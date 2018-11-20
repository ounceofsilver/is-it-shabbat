const DayMath = require("./DayMath");

function fridaySunset(now, latitude, longitude) {
    return DayMath.sunset(
		DayMath.nextOfWeek(now, DayMath.ofWeek.Friday), latitude, longitude
	);
}

const candleLighting = function(now, latitude, longitude) {
    // https://judaism.stackexchange.com/questions/4334/calculating-shabbat-candle-lighting-time
	return fridaySunset(now, latitude, longitude).minus({ minutes: 18 });
}

function havdala(now, latitude, longitude) {
    const sunsetSaturday = DayMath.sunset(
		DayMath.nextOfWeek(now, DayMath.ofWeek.Saturday), latitude, longitude
	);
    // https://www.hebcal.com/home/96/what-is-havdalah-or-when-does-shabbat-end
    // You can always end Shabbat later
    return sunsetSaturday.plus({ minutes: 42 });

}

module.exports = {
    fridaySunset,
    havdala,
    candleLighting,
}
