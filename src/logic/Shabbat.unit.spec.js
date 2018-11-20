const DateTime = require("luxon").DateTime;

describe("Shabbat unit", () => {

    const DayMath = {
        ofWeek: {
            Friday: 5,
            Saturday: 6
        }
    }
    const HebrewTimes = {
        fridaySunset: sinon.stub(),
        havdala: sinon.stub(),
        candleLighting: sinon.stub()
    }
    const Shabbat = proxyquire("../src/logic/Shabbat", {
        "./DayMath": DayMath,
        "./HebrewTimes": HebrewTimes
    });

    const location = [43, -71];
    afterEach(() => {
        // sinon.reset();
    });

    describe("isItShabbat", () => {

        const times = {
            candleLighting: DateTime.utc(2018, 11, 16, 12),
            fridaySunset: DateTime.utc(2018, 11, 16, 18),
            havdala: DateTime.utc(2018, 11, 17, 18),
        };  // times are not accurate, but dates and ordering should work properly

        beforeEach(() => {
            HebrewTimes.candleLighting.returns(times.candleLighting);
            HebrewTimes.fridaySunset.returns(times.fridaySunset);
            HebrewTimes.havdala.returns(times.havdala);
        });

        function testDates(dates, expectation) {
            dates
                .map(d => Shabbat.isItShabbat(d, ...location))
                .forEach(o => {
                    expect(o).to.deep.equal(expectation)
                });
        }

        it("should handle Sunday-Thursday", () => {
            testDates([
                DateTime.utc(2018, 11, 11, 12),
                DateTime.utc(2018, 11, 12, 12),
                DateTime.utc(2018, 11, 13, 12),
                DateTime.utc(2018, 11, 14, 12),
                DateTime.utc(2018, 11, 15, 12),
            ], {
                period: Shabbat.is.NOT_SHABBAT,
                countDownTo: times.candleLighting
            });
        });

        it("should handle Friday before candlelighting", () => {
            testDates([
                DateTime.utc(2018, 11, 16).startOf("day"),
                DateTime.utc(2018, 11, 16, 11, 59, 59),  // before noon
            ], {
                period: Shabbat.is.NOT_SHABBAT,
                countDownTo: times.candleLighting
            });
        });

        it("should handle Friday after candlelighting but before sunset", () => {
            testDates([
				DateTime.utc(2018, 11, 16, 12),
				DateTime.utc(2018, 11, 16, 17, 59, 59)
            ], {
                period: Shabbat.is.CANDLELIGHTING,
                countDownTo: times.fridaySunset
            });
        });

        it("should handle Friday after sunset", () => {
            testDates([
				DateTime.utc(2018, 11, 16, 18),
				DateTime.utc(2018, 11, 16).endOf("day"),
            ], {
                period: Shabbat.is.SHABBAT,
                countDownTo: times.havdala
            });
        });

        it("should handle Saturday before havdala", () => {
            testDates([
				DateTime.utc(2018, 11, 17).startOf("day"),
				DateTime.utc(2018, 11, 17, 17, 59, 59),
            ], {
                period: Shabbat.is.SHABBAT,
                countDownTo: times.havdala
            });
        });

        it("should handle Saturday after havdala", () => {
            const nextCandlelighting = DateTime.utc(2018, 11, 23, 18);
            HebrewTimes.candleLighting.returns(nextCandlelighting);
            testDates([
				DateTime.utc(2018, 11, 17, 18),
				DateTime.utc(2018, 11, 17).endOf("day")
            ], {
                period: Shabbat.is.NOT_SHABBAT,
                countDownTo: nextCandlelighting
            });
        });
    });
});



// const tests = [
//     {
//         date: DateTime.fromJSDate(new Date("8/22/2018 07:00:00")),
//         outcome: is.NOT_SHABBAT,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/24/2018 14:00:00")),
//         outcome: is.NOT_SHABBAT,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/24/2018 19:16:32")),
//         outcome: is.NOT_SHABBAT,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/24/2018 19:22:30")),
//         outcome: is.CANDLELIGHTING,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/24/2018 19:34:30")),
//         outcome: is.CANDLELIGHTING,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/24/2018 21:00:00")),
//         outcome: is.SHABBAT,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/24/2018 23:59:55")),
//         outcome: is.SHABBAT,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/25/2018 14:00:00")),
//         outcome: is.SHABBAT,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/25/2018 20:14:55")),
//         outcome: is.SHABBAT,
//     },
//     {
//         date: DateTime.fromJSDate(new Date("8/25/2018 21:00:00")),
//         outcome: is.NOT_SHABBAT,
//     },
// ]
// // console.log(candleLighting(tests[0].date, 43, -71), fridaySunset(tests[0].date, 43, -71), havdala(tests[0].date, 43, -71))
// results = tests.map(function (test) {
//     const sbt = isItShabbat(test.date, 43, -71)
//     return sbt.period == test.outcome
// });
// // console.log(results)
