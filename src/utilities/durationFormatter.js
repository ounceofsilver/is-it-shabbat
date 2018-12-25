
export const underAWeek = (dur) => {
	const {
		days, hours, minutes, seconds,
	} = dur.shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
	let x = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	if (minutes === 0 && hours === 0 && days === 0) {
		x = `${seconds}s`;
	} else if (hours === 0 && days === 0) {
		x = `${minutes}m ${seconds}s`;
	} else if (days === 0) { //
		x = `${hours}h ${minutes}m ${seconds}s`;
	}
	return x;
};


export const formatHolidayDuration = (dur) => {
	const {
		weeks, days, hours, minutes, seconds,
	} = dur.shiftTo('weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
	let y = `${weeks}w`;
	if (weeks === 0 && days === 0 && hours <= 2) {
		y = `${hours}h ${minutes}m ${seconds}s`;
	} else if (weeks === 0 && days === 0) {
		y = `${hours}h ${minutes}m`;
	} else if (weeks === 0) {
		y = `${days}d ${hours}h`;
	} else if (weeks <= 2) {
		y = `${weeks}w ${days}d`;
	}
	return y;
};
