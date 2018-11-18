
const DayMath = require("./DayMath");

const is = {
    SHABBAT: "SHABBAT",
    NOT_SHABBAT: "NOT_SHABBAT",
    CANDLELIGHTING: "CANDLELIGHTING",
}

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

function isItShabbat(now, latitude, longitude) {
    // SATURDAY
    const countDownTo;
    const period;
    if (now.getDay() === DayMath.ofWeek.Saturday) {
        const havdalaTime = havdala(now, latitude, longitude);
        if (now < havdalaTime) {
            period = is.SHABBAT;
            countDownTo = havdalaTime;
        } else {
            period = is.NOT_SHABBAT;
            countDownTo = candleLighting(now, latitude, longitude);
        }

        // FRIDAY
    } else if (now.getDay() === DayMath.ofWeek.Friday) {
        const fridaySunsetTime = fridaySunset(now, latitude, longitude);
        const candleLightingTime = candleLighting(now, latitude, longitude);
        if (now > candleLightingTime) {
            if (now < fridaySunsetTime) {
                period = is.CANDLELIGHTING;
                countDownTo = fridaySunsetTime;
            } else {
                period = is.SHABBAT;
                countDownTo = havdala(now, latitude, longitude);
            }
        } else {
            period = is.NOT_SHABBAT;
            countDownTo = candleLightingTime;
        }

        // OTHER DAYS
    } else {
        period = is.NOT_SHABBAT;
        countDownTo = candleLighting(now, latitude, longitude);
    }

    return {
        period: period,
        countDownTo: countDownTo
    }
}

module.exports = {
    is,
    isItShabbat,
    fridaySunset,
    havdala,
    candleLighting,
}
