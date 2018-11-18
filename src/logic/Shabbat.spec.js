describe("Shabbat", () => {
    const Shabbat = require("./Shabbat");
    const location = [43, -71];

    describe("isItShabbat", () => {

        function testDates(dates, expectation) {
            dates
                .map(d => Shabbat.isItShabbat(d, ...location))
                .forEach(o => {
                    expect(o.period).to.equal(expectation);
                    console.log(o.countDownTo);
                });
        }

        // TODO: add more test dates
        // TODO: use Luxon to better handle timezones, intervals
        it("should handle Sunday-Thursday", () => {
            testDates([
                new Date("8/19/2018 12:00:00 EST"),
                new Date("8/20/2018 12:00:00 EST"),
                new Date("8/21/2018 12:00:00 EST"),
                new Date("8/22/2018 12:00:00 EST"),
                new Date("8/23/2018 12:00:00 EST"),
            ], Shabbat.is.NOT_SHABBAT);
        });

        it("should handle Friday before candlelighting", () => {
            testDates([
                // new Date("8/24/2018 12:00:01 EST"),
                // new Date("8/24/2018 19:16:36 EST"),
            ], Shabbat.is.NOT_SHABBAT);
        });

        it("should handle Friday after candlelighting but before sunset", () => {
            testDates([
                // new Date("8/24/2018 19:22:30 EST"),
                // new Date("8/24/2018 19:34:30 EST"),
            ], Shabbat.is.CANDLELIGHTING);
        });

        it("should handle Friday after sunset", () => {
            testDates([
                new Date("8/24/2018 21:00:00 EST"),
                new Date("8/24/2018 23:59:55 EST"),
            ], Shabbat.is.SHABBAT);
        });

        it("should handle Saturday before havdala", () => {
            testDates([
                // new Date("8/25/2018 14:00:00 EST"),
                // new Date("8/25/2018 20:14:55 EST"),
            ], Shabbat.is.SHABBAT);
        });

        it("should handle Saturday after havdala", () => {
            testDates([
                new Date("8/25/2018 21:00:00")
            ], Shabbat.is.NOT_SHABBAT);
        });
    });
});
