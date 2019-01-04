
export const underAWeek = (dur) => {
	const {
		days, hours, minutes, seconds,
	} = dur.shiftTo('days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
	if (minutes === 0 && hours === 0 && days === 0) {
		return `${seconds}s`;
	}
	if (hours === 0 && days === 0) {
		return `${minutes}m ${seconds}s`;
	}
	if (days === 0) { //
		return `${hours}h ${minutes}m ${seconds}s`;
	}
	return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export const formatHolidayDuration = (dur) => {
	const {
		weeks, days, hours, minutes, seconds,
	} = dur.shiftTo('weeks', 'days', 'hours', 'minutes', 'seconds', 'milliseconds').toObject();
	if (weeks === 0 && days === 0 && hours <= 2) {
		return `${hours}h ${minutes}m ${seconds}s`;
	}
	if (weeks === 0 && days === 0) {
		return `${hours}h ${minutes}m`;
	}
	if (weeks === 0) {
		return `${days}d ${hours}h`;
	}
	if (weeks <= 2) {
		return `${weeks}w ${days}d`;
	}
	return `${weeks}w`;
};
