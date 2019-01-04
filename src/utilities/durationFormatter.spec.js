import { Duration } from 'luxon';

import {
	underAWeek,
	formatHolidayDuration,
} from './durationFormatter';

describe('durationFormatter:', () => {
	describe('underAWeek', () => {
		it('should return only seconds', () => {
			const result = underAWeek(Duration.fromObject({
				seconds: 12,
			}));

			expect(result).to.equal('12s');
		});

		it('should return only minutes and seconds', () => {
			const result = underAWeek(Duration.fromObject({
				minutes: 4,
				seconds: 12,
			}));

			expect(result).to.equal('4m 12s');
		});

		it('should return hours, minutes, and seconds', () => {
			const result = underAWeek(Duration.fromObject({
				hours: 18,
				minutes: 4,
				seconds: 12,
			}));

			expect(result).to.equal('18h 4m 12s');
		});

		it('should return days, hours, minutes, and seconds', () => {
			const result = underAWeek(Duration.fromObject({
				days: 3,
				hours: 18,
				minutes: 4,
				seconds: 12,
			}));

			expect(result).to.equal('3d 18h 4m 12s');
		});

		it('should return 0 at end of duration', () => {
			const result = underAWeek(Duration.fromObject({}));

			expect(result).to.equal('0s');
		});

		it('should be able to handle longer durations', () => {
			const result = underAWeek(Duration.fromObject({
				days: 8,
			}));

			expect(result).to.equal('8d 0h 0m 0s');
		});
	});

	describe('formatHolidayDuration', () => {
		it('should show minutes + seconds if hours less than 2', () => {
			const result = formatHolidayDuration(Duration.fromObject({
				hours: 1,
			}));

			expect(result).to.equal('1h 0m 0s');
		});

		it('should show only hours + minutes if no full days left', () => {
			const result = formatHolidayDuration(Duration.fromObject({
				hours: 3,
			}));

			expect(result).to.equal('3h 0m');
		});

		it('should show only days + hours if less than a week left', () => {
			const result = formatHolidayDuration(Duration.fromObject({
				days: 6,
			}));

			expect(result).to.equal('6d 0h');
		});

		it('should show only weeks + days if less than 2 weeks left', () => {
			const result = formatHolidayDuration(Duration.fromObject({
				weeks: 1,
			}));

			expect(result).to.equal('1w 0d');
		});

		it('should show only show weeks if more than 2 weeks left', () => {
			const result = formatHolidayDuration(Duration.fromObject({
				weeks: 3,
			}));

			expect(result).to.equal('3w');
		});
	});
});
