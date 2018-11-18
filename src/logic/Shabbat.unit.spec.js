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
            candleLighting: new Date("11/16/2018 12:00:00 Z"),
            fridaySunset: new Date("11/16/2018 18:00:00 Z"),
            havdala: new Date("11/17/2018 18:00:00 Z")
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
                new Date("11/11/18 12:00:00 Z"),
                new Date("11/12/18 12:00:00 Z"),
                new Date("11/13/18 12:00:00 Z"),
                new Date("11/14/18 12:00:00 Z"),
                new Date("11/15/18 12:00:00 Z"),
            ], {
                period: Shabbat.is.NOT_SHABBAT,
                countDownTo: times.candleLighting
            });
        });

        it("should handle Friday before candlelighting", () => {
            testDates([
                new Date("11/16/18 00:00:01 Z"),
                new Date("11/16/18 11:59:59 Z"),
            ], {
                period: Shabbat.is.NOT_SHABBAT,
                countDownTo: times.candleLighting
            });
        });

        it("should handle Friday after candlelighting but before sunset", () => {
            testDates([
                new Date("11/16/18 12:00:01 Z"),
                new Date("11/16/18 17:59:59 Z"),
            ], {
                period: Shabbat.is.CANDLELIGHTING,
                countDownTo: times.fridaySunset
            });
        });

        it("should handle Friday after sunset", () => {
            testDates([
                new Date("11/16/18 18:00:01 Z"),
                new Date("11/16/18 23:59:59 Z"),
            ], {
                period: Shabbat.is.SHABBAT,
                countDownTo: times.havdala
            });
        });

        it("should handle Saturday before havdala", () => {
            testDates([
                new Date("11/17/18 00:00:01 Z"),
                new Date("11/17/18 17:59:59 Z"),
            ], {
                period: Shabbat.is.SHABBAT,
                countDownTo: times.havdala
            });
        });

        it("should handle Saturday after havdala", () => {
            const nextCandlelighting = new Date("11/23/18 18:00:00");
            HebrewTimes.candleLighting.returns(nextCandlelighting);
            testDates([
                new Date("11/17/18 18:00:01 Z"),
                new Date("11/17/18 23:59:59 Z"),
            ], {
                period: Shabbat.is.NOT_SHABBAT,
                countDownTo: nextCandlelighting
            });
        });
    });
});



// const tests = [
//     {
//         date: new Date("8/22/2018 07:00:00"),
//         outcome: is.NOT_SHABBAT,
//     },
//     {
//         date: new Date("8/24/2018 14:00:00"),
//         outcome: is.NOT_SHABBAT,
//     },
//     {
//         date: new Date("8/24/2018 19:16:32"),
//         outcome: is.NOT_SHABBAT,
//     },
//     {
//         date: new Date("8/24/2018 19:22:30"),
//         outcome: is.CANDLELIGHTING,
//     },
//     {
//         date: new Date("8/24/2018 19:34:30"),
//         outcome: is.CANDLELIGHTING,
//     },
//     {
//         date: new Date("8/24/2018 21:00:00"),
//         outcome: is.SHABBAT,
//     },
//     {
//         date: new Date("8/24/2018 23:59:55"),
//         outcome: is.SHABBAT,
//     },
//     {
//         date: new Date("8/25/2018 14:00:00"),
//         outcome: is.SHABBAT,
//     },
//     {
//         date: new Date("8/25/2018 20:14:55"),
//         outcome: is.SHABBAT,
//     },
//     {
//         date: new Date("8/25/2018 21:00:00"),
//         outcome: is.NOT_SHABBAT,
//     },
// ]
// // console.log(candleLighting(tests[0].date, 43, -71), fridaySunset(tests[0].date, 43, -71), havdala(tests[0].date, 43, -71))
// results = tests.map(function (test) {
//     const sbt = isItShabbat(test.date, 43, -71)
//     return sbt.period == test.outcome
// });
// // console.log(results)
