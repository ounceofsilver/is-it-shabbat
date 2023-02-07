export default {
	copyright: `© 2018-${new Date().getFullYear()}\nAn Ounce of Silver Technologies`,
	privacy: `Privacy Policy`,
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
			set: 'Set Location',
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
		denied: 'Please enable location services for Is It Shabbat? in your settings. Using default location.',
	},
	share: {
		message: 'Shalom! Try out the "Is It Shabbat?" app:',
	},
	notes: {
		localtime: 'All times are shown in local device time, even if another location is selected.',
		approximate: 'All times are based on approximate sunset times.',
		calculations: 'Shabbat is assumed to begin at sunset. Candlelighting begins 18 minutes before Shabbat. Shabbat is assumed to end 42 minutes after sunset.',
		holidayssource: 'Holiday dates are courtesy of hebcal.com'
	},
};
