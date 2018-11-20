const DateTime = require("luxon").DateTime;

describe("HebrewTimes", () => {
    const HebrewTimes = require("./HebrewTimes");

    const location = [43, -71];

    describe("fridaySunset", () => {
		const testDates = (list, day) => {
			list.forEach(d => {
				const fs = HebrewTimes.fridaySunset(d, ...location);
				expect(fs.weekday).to.equal(5);
				expect(fs.day).to.equal(day);
				expect(fs.zone).to.equal(d.zone);
			});
		}

		it("should handle commmon case", () => {
			testDates([
				DateTime.local(2018, 11, 17),
				DateTime.local(2018, 11, 18),
				DateTime.local(2018, 11, 19),
				DateTime.local(2018, 11, 20),
				DateTime.local(2018, 11, 21),
				DateTime.local(2018, 11, 22),
			], 23);
		});

		it("should handle friday before sunset", () => {
			testDates([
				DateTime.local(2018, 11, 23).startOf("day"),
				DateTime.local(2018, 11, 23, 12),
			], 23);

			testDates([
				DateTime.local(2018, 8, 24).startOf("day"),
			], 24)
		});

		it("should handle friday after sunset", () => {
			testDates([
				DateTime.local(2018, 11, 16, 23, 59, 59)
			], 16);
		});
    });

    describe("candleLighting", () => {
		const testDates = list => {
			list.forEach(d => {
				const fs = HebrewTimes.fridaySunset(d, ...location);
				const cl = HebrewTimes.candleLighting(d, ...location);
				expect(fs.diff(cl, "minutes").minutes).to.equal(18)
			});
		}

		it("should be 18 minutes before fridaySunset", () => {
			testDates([
				DateTime.local(2018, 11, 17),
				DateTime.local(2018, 11, 18),
				DateTime.local(2018, 11, 19),
				DateTime.local(2018, 11, 20),
				DateTime.local(2018, 11, 21),
				DateTime.local(2018, 11, 22),
				DateTime.local(2018, 11, 23),
				DateTime.local(2018, 11, 23, 0).startOf("day"),
				DateTime.local(2018, 11, 23).endOf("day"),
				DateTime.local(2018, 11, 24),
			]);
		});
    });

    describe("havdala", () => {

		const testDates = (list, day) => {
			list.forEach(d => {
				const fs = HebrewTimes.havdala(d, ...location);
				expect(fs.weekday).to.equal(6);
				expect(fs.day).to.equal(day);
				expect(fs.zone).to.equal(d.zone);
			});
		}

		it("should handle common case", () => {
			testDates([
				DateTime.local(2018, 11, 18),
				DateTime.local(2018, 11, 19),
				DateTime.local(2018, 11, 20),
				DateTime.local(2018, 11, 21),
				DateTime.local(2018, 11, 22),
				DateTime.local(2018, 11, 23),
			], 24);
		});

		it("should handle Saturday before havdala", () => {
			testDates([
				DateTime.local(2018, 11, 24, 0).startOf("day"),
			], 24);
		});

		it("should handle Saturday after havdala", () => {
			testDates([
				DateTime.local(2018, 11, 24).endOf("day"),
			], 24);
		});
    });
});
