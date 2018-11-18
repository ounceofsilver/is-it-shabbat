
const DayMath = require("./DayMath");
const HebrewTimes = require("./HebrewTimes");

const is = {
    SHABBAT: "SHABBAT",
    NOT_SHABBAT: "NOT_SHABBAT",
    CANDLELIGHTING: "CANDLELIGHTING",
}

function isItShabbat(now, latitude, longitude) {
    // SATURDAY
    let countDownTo;
    let period;
    if (now.getDay() === DayMath.ofWeek.Saturday) {
        const havdalaTime = HebrewTimes.havdala(now, latitude, longitude);
        if (now < havdalaTime) {
            period = is.SHABBAT;
            countDownTo = havdalaTime;
        } else {
            period = is.NOT_SHABBAT;
            countDownTo = HebrewTimes.candleLighting(now, latitude, longitude);
        }

        // FRIDAY
    } else if (now.getDay() === DayMath.ofWeek.Friday) {
        const fridaySunsetTime = HebrewTimes.fridaySunset(now, latitude, longitude);
        const candleLightingTime = HebrewTimes.candleLighting(now, latitude, longitude);
        if (now > candleLightingTime) {
            if (now < fridaySunsetTime) {
                period = is.CANDLELIGHTING;
                countDownTo = fridaySunsetTime;
            } else {
                period = is.SHABBAT;
                countDownTo = HebrewTimes.havdala(now, latitude, longitude);
            }
        } else {
            period = is.NOT_SHABBAT;
            countDownTo = candleLightingTime;
        }

        // OTHER DAYS
    } else {
        period = is.NOT_SHABBAT;
        countDownTo = HebrewTimes.candleLighting(now, latitude, longitude);
    }

    return {
        period: period,
        countDownTo: countDownTo
    }
}

module.exports = {
    is,
    isItShabbat
}
