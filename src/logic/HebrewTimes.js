
const DayMath = require("./DayMath");

function fridaySunset(now, latitude, longitude) {
    return DayMath.data(
        DayMath.nextOfWeek(now, DayMath.ofWeek.Friday),
        latitude,
        longitude
    ).sunset;
}

const candleLighting = function(now, latitude, longitude) {
    // https://judaism.stackexchange.com/questions/4334/calculating-shabbat-candle-lighting-time
    // 18 minutes *
    // 60 sec/min * [1080]
    // 1000 ms/sec = 1080000
    return new Date(fridaySunset(now, latitude, longitude).getTime() - 1080000);  // 18 minutes
}

function havdala(now, latitude, longitude) {
    const sunsetSaturday = DayMath.data(
        DayMath.nextOfWeek(now, DayMath.ofWeek.Saturday),
        latitude,
        longitude
    ).sunset;
    // https://www.hebcal.com/home/96/what-is-havdalah-or-when-does-shabbat-end
    // You can always end Shabbat later
    // 42 minutes *
    // 60 sec/min * [2520]
    // 1000 ms/sec = 2520000
    return new Date(sunsetSaturday.getTime() + 2520000)

}

module.exports = {
    fridaySunset,
    havdala,
    candleLighting,
}
