import { DateTime } from 'luxon';

//
// React util configuration and export
//
// Enzyme.configure({ adapter: new Adapter() });

// global.shallow = shallow;

//
// Custom util configuration and export
//
export const local = (
	year: number,
	month: number,
	day: number,
	hour: number = 0,
	minute: number = 0,
	second: number = 0,
	millisecond: number = 0
) => DateTime.fromObject({
	day,
	hour,
	millisecond,
	minute,
	month,
	second,
	year,
	zone: 'America/New_York',
});
