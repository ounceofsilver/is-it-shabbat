import { IHebcalOptions } from './api';
import { IHolidayOptions } from './types';

const onOff = (b: boolean): 'on' | 'off' => b ? 'on' : 'off';

export function mapOptions(options: IHolidayOptions): IHebcalOptions {
	return {
		i: onOff(options.hillel),  // Depends on location (Israel)
		maj: onOff(options.major),  // major holidays
		mf: onOff(options.fasts),
		min: onOff(options.minor),  // minor holidays
		mod: onOff(options.modern),
		nx: onOff(options.roshChodeshim),
		ss: onOff(options.specialShabbatim),
	};
}
