export default {
	copyright: '© 2018-2020\nAn Ounce of Silver Technologies',
	loading: {
		message: 'Loading location and assets...',
		error: 'Is It Shabbat? failed to load the current location. Please try again.',
	},
	endEventName: {
		CANDLELIGHTING: '%{duration}\nuntil Shabbat begins',
		NOT_SHABBAT: '%{duration}\nuntil candle lighting',
		SHABBAT: '%{duration}\nuntil Shabbat ends',
	},
	holidays: {
		headings: {
			major: 'Upcoming Holidays',
			roshchodeshim: 'Rosh Chodeshim',
		},
	},
	screens: {
		settings: 'Settings',
	},
	settings: {
		location: {
			useCurrentLocation: 'Use Current Location',
		},
	},
	startEventName: {
		CANDLELIGHTING: 'Shabbat begins at\n%{end}',
		NOT_SHABBAT: 'Candle Lighting at\n%{end}',
		SHABBAT: 'Shabbat ends at\n%{end}',
	},
	status: {
		CANDLELIGHTING: 'Almost...',
		NOT_SHABBAT: 'No...',
		SHABBAT: 'Yes!',
	},
	title: 'Is It Shabbat?',
	location: {
		unavailable: 'Unable to access your location at this time. Using default location.',
		// tslint:disable-next-line: max-line-length
		denied: 'Please enable location services for Is It Shabbat? in your settings. Using default location.',
	},
	share: {
		message: 'Shalom! Try out the "Is It Shabbat?" app:',
	},
};
