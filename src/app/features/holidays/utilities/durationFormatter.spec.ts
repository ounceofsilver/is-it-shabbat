import { Duration } from 'luxon';
import { formatHolidayDuration } from './durationFormatter';

describe('formatHolidayDuration', () => {
	it('should show minutes + seconds if hours less than 2', () => {
		const result = formatHolidayDuration(Duration.fromObject({
			hours: 1,
		}));

		expect(result).toBe('1h 0m 0s');
	});

	it('should show only hours + minutes if no full days left', () => {
		const result = formatHolidayDuration(Duration.fromObject({
			hours: 3,
		}));

		expect(result).toBe('3h 0m');
	});

	it('should show only days + hours if less than a week left', () => {
		const result = formatHolidayDuration(Duration.fromObject({
			days: 6,
		}));

		expect(result).toBe('6d 0h');
	});

	it('should show only weeks + days if less than 2 weeks left', () => {
		const result = formatHolidayDuration(Duration.fromObject({
			weeks: 1,
		}));

		expect(result).toBe('1w 0d');
	});

	it('should show only show weeks if more than 2 weeks left', () => {
		const result = formatHolidayDuration(Duration.fromObject({
			weeks: 3,
		}));

		expect(result).toBe('3w');
	});
});
