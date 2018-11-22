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
				local(2018, 11, 17),
				local(2018, 11, 18),
				local(2018, 11, 19),
				local(2018, 11, 20),
				local(2018, 11, 21),
				local(2018, 11, 22),
			], 23);
		});

		it("should handle friday before sunset", () => {
			testDates([
				local(2018, 11, 23).startOf("day"),
				local(2018, 11, 23, 12),
			], 23);

			testDates([
				local(2018, 8, 24).startOf("day"),
			], 24)
		});

		it("should handle friday after sunset", () => {
			testDates([
				local(2018, 11, 16, 23, 59, 59)
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
				local(2018, 11, 17),
				local(2018, 11, 18),
				local(2018, 11, 19),
				local(2018, 11, 20),
				local(2018, 11, 21),
				local(2018, 11, 22),
				local(2018, 11, 23),
				local(2018, 11, 23, 0).startOf("day"),
				local(2018, 11, 23).endOf("day"),
				local(2018, 11, 24),
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
				local(2018, 11, 18),
				local(2018, 11, 19),
				local(2018, 11, 20),
				local(2018, 11, 21),
				local(2018, 11, 22),
				local(2018, 11, 23),
			], 24);
		});

		it("should handle Saturday before havdala", () => {
			testDates([
				local(2018, 11, 24).startOf("day"),
			], 24);
			testDates([
				local(2018, 8, 25).endOf("day"),
			], 25);
		});

		it("should handle Saturday after havdala", () => {
			testDates([
				local(2018, 11, 24).endOf("day"),
			], 24);
			testDates([
				local(2018, 8, 25).endOf("day"),
			], 25);
		});
    });
});
