import { Text, View } from 'react-native';

import { fonts, colors, size } from '../theme';

//
// Text
//

function withStyle(Component, styles) {
	return props => <Component {...props} style={{
		...styles, ...props.style,
	}}  />;
}

export const StyledText = withStyle(Text, { fontFamily: fonts.primary });
const ParagraphText = withStyle(StyledText, { color: colors.textMain, marginTop: 10 });

// Primary
export const PrimaryText = withStyle(ParagraphText, { color: colors.textMain, fontSize: 28 });
export const PrimaryCenterText = withStyle(PrimaryText, { textAlign: 'center' });

// Secondary
export const SecondaryText = withStyle(ParagraphText, { color: colors.textMain, fontSize: 18 });
export const SecondaryCenterText = withStyle(SecondaryText, { textAlign: 'center' });

// Ternary
export const MainText = withStyle(ParagraphText, { color: colors.textSubtle, fontSize: 15 });
export const MainCenterText = withStyle(MainText, { textAlign: 'center' });

//
// Special
//
export const ShabbatText = withStyle(StyledText, {
	color: colors.textMain,
	fontSize: size.title,
	margin: 5,
	textAlign: 'center',
});

export const ShabbatSubtitleText = withStyle(StyledText, {
	color: colors.textSubtle,
	fontSize: size.subtitle,
	textAlign: 'center',
});

export const AppTitleText = withStyle(StyledText, {
	color: colors.textSubtle, fontSize: 48, textAlign: 'center',
});

export const CopyrightText = withStyle(StyledText, {
	color: colors.textSubtle,
	textAlign: 'center',
	fontSize: 18,
});

export const HolidayHeadingText = withStyle(StyledText, {
	color: colors.textSubtle,
	fontSize: 26,
	textAlign: 'center',
});

export const HolidayTitleText = withStyle(StyledText, {
	color: colors.textMain,
	fontSize: 24,
	textAlign: 'center',
});

export const HolidaySubtitleText = withStyle(StyledText, {
	color: colors.textSubtle,
	fontSize: size.subtitle,
	textAlign: 'center',
});

export const OmerPromptText = withStyle(StyledText, {
	color: colors.textMain,
	fontSize: 24,
	textAlign: 'center',
});

//
// Containers
//
export const CenteredContainer = withStyle(View, {
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});
export const BackgroundView = withStyle(View, {
	height: '100%',
	backgroundColor: colors.background,
});

export const Footer = withStyle(View, {
	backgroundColor: colors.background,

	position: 'absolute',
	bottom: 20,
	width: '100%',

	paddingVertical: 10,
	paddingHorizontal: 20,

	flex: 1,
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
});
