
describe("DayMath", () => {
    const suncalc = {
        getTimes: sinon.stub()
    }
    const DayMath = proxyquire("../src/logic/DayMath", { suncalc });

    afterEach(() => {
        sinon.restore();
    })

    describe("ofWeek", () => {
        it("should map to numbers properly", () => {
            expect(DayMath.ofWeek.Sunday).to.equal(0);
            expect(DayMath.ofWeek.Monday).to.equal(1);
            expect(DayMath.ofWeek.Tuesday).to.equal(2);
            expect(DayMath.ofWeek.Wednesday).to.equal(3);
            expect(DayMath.ofWeek.Thursday).to.equal(4);
            expect(DayMath.ofWeek.Friday).to.equal(5);
            expect(DayMath.ofWeek.Saturday).to.equal(6);
        });
    });

    describe("nextOfWeek", () => {
        it("should handle basic case", () => {
            const d = new Date(2018, 10, 16, 20, 42, 30);
            const outcome = new Date(2018, 10, 17, 20, 42, 30);
            expect(DayMath.nextOfWeek(d, DayMath.ofWeek.Saturday)).to.deep.equal(outcome);
        });

        it("should wrap-around to next week", () => {
            const d = new Date(2018, 10, 17, 20, 42, 30);
            const outcome = new Date(2018, 10, 18, 20, 42, 30);
            expect(DayMath.nextOfWeek(d, DayMath.ofWeek.Sunday)).to.deep.equal(outcome);
        });

        it("should return input if day is already the requested day of week", () => {
            const d = new Date(2018, 10, 17, 20, 42, 30);
            const outcome = new Date(2018, 10, 17, 20, 42, 30);
            expect(DayMath.nextOfWeek(d, DayMath.ofWeek.Saturday)).to.deep.equal(outcome);
        });
    });

    describe("data", () => {
        it("should pass call to suncalc.getTimes", () => {
            DayMath.data(1, 2, 3);
            expect(suncalc.getTimes).to.have.been.calledOnce;
            expect(suncalc.getTimes.args[0]).to.deep.equal([1, 2, 3])
        });

        it("should return suncalc.getTimes's return value", () => {
            const suncalcRetValue = "RETVALUE";
            suncalc.getTimes.returns(suncalcRetValue);

            const output = DayMath.data(1, 2, 3);

            expect(output).to.equal(suncalcRetValue);
        });
    });
});
