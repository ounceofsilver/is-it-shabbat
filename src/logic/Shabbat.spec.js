const DateTime = require("luxon").DateTime;

describe("Shabbat", () => {

    const HebrewTimes = require("./HebrewTimes");
    const Shabbat = require("./Shabbat");
    const location = [43, -71];

    describe("isItShabbat", () => {

        function testDates(dates, expectation) {
            dates.forEach(d => {
				const o = Shabbat.isItShabbat(d, ...location);
                expect(o.period).to.equal(expectation);
				expect(o.countDownTo.zone).to.equal(d.zone);
            });
        }

        it("should handle Sunday-Thursday", () => {
            testDates([
				DateTime.local(2018, 8, 19).startOf("day"),
				DateTime.local(2018, 8, 19, 12),
				DateTime.local(2018, 8, 19).endOf("day"),
				DateTime.local(2018, 8, 20).startOf("day"),
				DateTime.local(2018, 8, 20, 12),
				DateTime.local(2018, 8, 20).endOf("day"),
				DateTime.local(2018, 8, 21).startOf("day"),
				DateTime.local(2018, 8, 21, 12),
				DateTime.local(2018, 8, 21).endOf("day"),
				DateTime.local(2018, 8, 22).startOf("day"),
				DateTime.local(2018, 8, 22, 12),
				DateTime.local(2018, 8, 22).endOf("day"),
				DateTime.local(2018, 8, 23).startOf("day"),
				DateTime.local(2018, 8, 23, 12),
				DateTime.local(2018, 8, 23).endOf("day"),
            ], Shabbat.is.NOT_SHABBAT);
        });

        it("should handle Friday before candlelighting", () => {
            testDates([
				DateTime.local(2018, 8, 24).startOf("day"),
            ], Shabbat.is.NOT_SHABBAT);
        });

        it("should handle Friday after candlelighting but before sunset", () => {
			const cl = HebrewTimes.candleLighting(
				DateTime.fromObject({year: 2018, month: 8, day: 24, hour: 19, minute: 22, second: 30, zone: "America/New_York"}),
				...location
			);
            testDates([
                cl.plus({ seconds: 1 }),
                cl.plus({ minutes: 17 }),
            ], Shabbat.is.CANDLELIGHTING);
        });

        it("should handle Friday after sunset", () => {
            testDates([
				DateTime.local(2018, 8, 24).endOf("day"),
            ], Shabbat.is.SHABBAT);
        });

        it("should handle Saturday before havdala", () => {
            testDates([
				DateTime.local(2018, 8, 25).startOf("day"),
            ], Shabbat.is.SHABBAT);
        });

        it("should handle Saturday after havdala", () => {
            testDates([
				DateTime.local(2018, 8, 25).endOf("day"),
            ], Shabbat.is.NOT_SHABBAT);
        });
    });
});
