import { createTheming } from '@callstack/react-theme-provider';

export const colors = {
	background: '#3D2F40',
	textMain: '#F4BDFF',
	textSubtle: '#7A5F7F',
};
export const fonts = {
	primary: 'FredokaOne',
};
export const size = {
	secondary: 22,
	subtitle: 18,
	title: 72,
};
export const defaultTheme = {
	colors,
	fonts,
	size,
};

export const shabbatTheme = {
	fonts,
	size,
	colors: {
		...colors,
		background: '#000000',
		textMain: '#f0a6ff',
		textSubtle: '#7e7380',
	},
};

export const candlelightingTheme = {
	fonts,
	size,
	colors: {
		...colors,
		background: '#222222',
		textMain: '#f0a6ff',
		textSubtle: '#7e7380',
	},
};

export const { ThemeProvider, withTheme, useTheme } = createTheming(defaultTheme);

export type ITheme = ReturnType<typeof useTheme>;
