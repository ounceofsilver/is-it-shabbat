
Day = require("./DayMath");

is = {
    SHABBAT: "SHABBAT",
    NOT_SHABBAT: "NOT_SHABBAT",
    CANDLELIGHTING: "CANDLELIGHTING",
}

function fridaySunset(now, latitude, longitude) {
    return Day.data(
        Day.nextOfWeek(now, Day.ofWeek.Friday),
        latitude,
        longitude
    ).sunset;
}

var candleLighting = function(now, latitude, longitude) {
    // https://judaism.stackexchange.com/questions/4334/calculating-shabbat-candle-lighting-time
    // 18 minutes *
    // 60 sec/min * [1080]
    // 1000 ms/sec = 1080000
    return new Date(fridaySunset(now, latitude, longitude).getTime() - 1080000);  // 18 minutes
}

function havdala(now, latitude, longitude) {
    var sunsetSaturday = Day.data(
        Day.nextOfWeek(now, Day.ofWeek.Saturday),
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
    var countDownTo;
    var period;
    if (now.getDay() === Day.ofWeek.Saturday) {
        var havdalaTime = havdala(now, latitude, longitude);
        if (now < havdalaTime) {
            period = is.SHABBAT;
            countDownTo = havdalaTime;
        } else {
            period = is.NOT_SHABBAT;
            countDownTo = candleLighting(now, latitude, longitude);
        }

        // FRIDAY
    } else if (now.getDay() === Day.ofWeek.Friday) {
        var fridaySunsetTime = fridaySunset(now, latitude, longitude);
        var candleLightingTime = candleLighting(now, latitude, longitude);
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

var tests = [
    {
        date: new Date("8/22/2018 07:00:00"),
        outcome: is.NOT_SHABBAT,
    },
    {
        date: new Date("8/24/2018 14:00:00"),
        outcome: is.NOT_SHABBAT,
    },
    {
        date: new Date("8/24/2018 19:16:32"),
        outcome: is.NOT_SHABBAT,
    },
    {
        date: new Date("8/24/2018 19:22:30"),
        outcome: is.CANDLELIGHTING,
    },
    {
        date: new Date("8/24/2018 19:34:30"),
        outcome: is.CANDLELIGHTING,
    },
    {
        date: new Date("8/24/2018 21:00:00"),
        outcome: is.SHABBAT,
    },
    {
        date: new Date("8/24/2018 23:59:55"),
        outcome: is.SHABBAT,
    },
    {
        date: new Date("8/25/2018 14:00:00"),
        outcome: is.SHABBAT,
    },
    {
        date: new Date("8/25/2018 20:14:55"),
        outcome: is.SHABBAT,
    },
    {
        date: new Date("8/25/2018 21:00:00"),
        outcome: is.NOT_SHABBAT,
    },
]
console.log(candleLighting(tests[0].date, 43, -71), fridaySunset(tests[0].date, 43, -71), havdala(tests[0].date, 43, -71))
results = tests.map(function(test) {
    var sbt = isItShabbat(test.date, 43, -71)
    return sbt.period == test.outcome
});
console.log(results)
