describe("HebrewTimes unit", () => {
    const DayMath = {
        ofWeek: {
            Friday: 5,
            Saturday: 6
        },
        data: sinon.stub(),
        nextOfWeek: sinon.stub()
    }
    const HebrewTimes = proxyquire("../src/logic/HebrewTimes", {
        "./DayMath": DayMath
    });

    const location = [43, -71];
    afterEach(() => {
        sinon.reset();
    });

    describe("fridaySunset", () => {
        it("should call DayMath and return DayMath.data.sunset", () => {
            const d = new Date("8/22/2018 07:00:00");
            const friday = new Date("12/25/0 07:00:00");
            DayMath.data.returns({ sunset: "SUNSET" });
            DayMath.nextOfWeek.returns(friday);

            const outcome = HebrewTimes.fridaySunset(d, ...location);

            expect(DayMath.nextOfWeek).to.have.been.calledOnce;
            expect(DayMath.nextOfWeek.args[0][0]).to.deep.equal(d);
            expect(DayMath.nextOfWeek.args[0][1]).to.deep.equal(DayMath.ofWeek.Friday);

            expect(DayMath.data).to.have.been.calledOnce;
            expect(DayMath.data.args[0][0]).to.deep.equal(friday);
            expect(DayMath.data.args[0][1]).to.deep.equal(location[0]);
            expect(DayMath.data.args[0][2]).to.deep.equal(location[1]);

            expect(outcome).to.equal("SUNSET");
        });
    });

    describe("candleLighting", () => {
        it("should return date 18 minutes before sunset given by DayMath.data.sunset", () => {
            const d = "Input Day";
            const fridaySunset = new Date("12/25/0 07:00:00");
            const expectedOutcome = new Date("12/25/0 06:42:00");
            DayMath.data.returns({ sunset: fridaySunset });

            const outcome = HebrewTimes.candleLighting(d, ...location);
            expect(outcome).to.deep.equal(expectedOutcome);
        });
    });

    describe("havdala", () => {
        it("should return date 42 minutes after sunset given by DayMath.data.sunset", () => {
            const d = "Input Day";
            const nextSaturday = new Date("11/25/0 14:00:00");
            const saturdaySunset = new Date("11/29/0 22:00:00");
            const expectedOutcome = new Date("11/29/0 22:42:00");
            DayMath.nextOfWeek.returns("nextSaturday");
            DayMath.data.returns({ sunset: saturdaySunset });

            const outcome = HebrewTimes.havdala(d, ...location);

            expect(outcome).to.deep.equal(expectedOutcome);
        });
    });
});
