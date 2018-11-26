import { is } from './logic/Shabbat';

export const message = {
	[is.SHABBAT]: 'Yes!',
	[is.NOT_SHABBAT]: 'No...',
	[is.CANDLELIGHTING]: 'Almost...',
};

export const endEventName = {
	[is.SHABBAT]: 'Shabbat ends',
	[is.NOT_SHABBAT]: 'candle lighting',
	[is.CANDLELIGHTING]: 'Shabbat begins',
};
