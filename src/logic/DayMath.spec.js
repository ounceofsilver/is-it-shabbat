describe("DayMath", () => {
	const DayMath = require("./DayMath");
	const location = [43, -71];

	describe("ofWeek", () => {
        it("should map to numbers properly", () => {
            expect(DayMath.ofWeek.Monday).to.equal(1);
            expect(DayMath.ofWeek.Tuesday).to.equal(2);
            expect(DayMath.ofWeek.Wednesday).to.equal(3);
            expect(DayMath.ofWeek.Thursday).to.equal(4);
            expect(DayMath.ofWeek.Friday).to.equal(5);
            expect(DayMath.ofWeek.Saturday).to.equal(6);
			expect(DayMath.ofWeek.Sunday).to.equal(7);
        });
    });

	describe("nextOfWeek", () => {
        it("should handle basic case", () => {
            const d = local(2018, 10, 16, 20, 42, 30);
            const outcome = DayMath.nextOfWeek(d, DayMath.ofWeek.Saturday);
			expect(outcome.weekday).to.equal(DayMath.ofWeek.Saturday);
			expect(outcome.day).to.equal(20);
			expect(outcome.hour).to.equal(20);
			expect(outcome.minute).to.equal(42);
			expect(outcome.second).to.equal(30);
			expect(outcome.zone).to.equal(d.zone);
        });

        it("should wrap-around to next week", () => {
			const d = local(2018, 10, 17, 20, 42, 30);
            const outcome = DayMath.nextOfWeek(d, DayMath.ofWeek.Monday);
			expect(outcome.weekday).to.equal(DayMath.ofWeek.Monday);
			expect(outcome.day).to.equal(22);
			expect(outcome.hour).to.equal(20);
			expect(outcome.minute).to.equal(42);
			expect(outcome.second).to.equal(30);
			expect(outcome.zone).to.equal(d.zone);
        });

        it("should return input if day is already the requested day of week", () => {
			const d = local(2018, 10, 22, 20, 42, 30);
            const outcome = DayMath.nextOfWeek(d, DayMath.ofWeek.Monday);
			expect(outcome.weekday).to.equal(DayMath.ofWeek.Monday);
			expect(outcome.day).to.equal(22);
			expect(outcome.hour).to.equal(20);
			expect(outcome.minute).to.equal(42);
			expect(outcome.second).to.equal(30);
			expect(outcome.zone).to.equal(d.zone);
        });
    });

	describe("sunset", () => {
		it("returns sunset with same zone and day as original DateTime", () => {
			[
				local(2018, 11, 19).startOf("day"),
				local(2018, 11, 19, 12),
				local(2018, 11, 19).endOf("day"),
				DateTime.utc(2018, 11, 19).startOf("day"),
				DateTime.utc(2018, 11, 19, 12),
				DateTime.utc(2018, 11, 19).endOf("day"),

				local(2018, 8, 24).startOf("day"),
				local(2018, 8, 24).endOf("day"),
			].forEach(d => {
				const o = DayMath.sunset(d, ...location)
				expect(o.year).to.equal(d.year);
				expect(o.month).to.equal(d.month);
				expect(o.day).to.equal(d.day);
				expect(o.zone).to.equal(d.zone);
			});
		});
    });

})
