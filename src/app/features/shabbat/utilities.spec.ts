import { Duration } from 'luxon';
import { underAWeek } from './utilities';

describe('underAWeek', () => {
	it('should return only seconds', () => {
		const result = underAWeek(Duration.fromObject({
			seconds: 12,
		}));

		expect(result).toBe('12s');
	});

	it('should return only minutes and seconds', () => {
		const result = underAWeek(Duration.fromObject({
			minutes: 4,
			seconds: 12,
		}));

		expect(result).toBe('4m 12s');
	});

	it('should return hours, minutes, and seconds', () => {
		const result = underAWeek(Duration.fromObject({
			hours: 18,
			minutes: 4,
			seconds: 12,
		}));

		expect(result).toBe('18h 4m 12s');
	});

	it('should return days, hours, minutes, and seconds', () => {
		const result = underAWeek(Duration.fromObject({
			days: 3,
			hours: 18,
			minutes: 4,
			seconds: 12,
		}));

		expect(result).toBe('3d 18h 4m 12s');
	});

	it('should return 0 at end of duration', () => {
		const result = underAWeek(Duration.fromObject({}));

		expect(result).toBe('0s');
	});

	it('should be able to handle longer durations', () => {
		const result = underAWeek(Duration.fromObject({
			days: 8,
		}));

		expect(result).toBe('8d 0h 0m 0s');
	});
});
