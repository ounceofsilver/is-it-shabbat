const DateTime = require("luxon").DateTime;

describe("Big Shabbat Test", () => {
	function range(x, y, n = 1) {
		const numbers = [];
		for (let i = x; i < y; i = i + n) {
			numbers.push(i);
		}
		return numbers;
	}

	const HebrewTimes = require("./HebrewTimes");
	const Shabbat = require("./Shabbat");

	[
		{ zone: "America/New_York", lat: 40, long: -74 },
		{ zone: "America/Los_Angeles", lat: 34, long: -118 },
		{ zone: "Africa/Johannesburg", lat: -26, long: 28 },
		{ zone: "Asia/Jerusalem", lat: 32, long: 35 },
		{ zone: "Asia/Tokyo", lat: 36, long: 140 },
		{ zone: "Europe/London", lat: 52, long: 0 },
	].forEach(({zone, lat, long}) => {
		it("should work in " + zone, async function() {
			this.timeout(120 * 1000);
			range(1, 13, 3).forEach(month => {  // every month
				range(1, 8).forEach(day => {  // first week
					range(1, 24).forEach(hour => {  // every hour
						range(0, 60, 15).forEach(minute => {  // every 15 minutes
							const o = DateTime.fromObject({
								zone: zone,
								year: 2018,
								month: month,
								day: day,
								hour: hour,
								minute: minute
							});
							const d = Shabbat.isItShabbat(o, lat, long).countDownTo;
							try {
								expect(d.zone.zoneName).to.equal(zone);
								expect(d.month).to.equal(month);
								expect(d.year).to.equal(2018);
								if([5, 6].indexOf(o.weekday) === -1) {
									expect(d.weekday).to.equal(5);
								} else {
									expect(d.weekday).to.be.oneOf([5, 6])
								}
							} catch(err) {
								console.log(o.toString(), d.toString());
								throw err;
							}

						});
					});
				});
			});
		});
	});
});
