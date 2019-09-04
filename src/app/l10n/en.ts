export default {
	copyright: '© 2018-19\nAn Ounce of Silver Technologies',
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
};
