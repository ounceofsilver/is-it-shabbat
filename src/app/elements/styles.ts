import { Text, View } from 'react-native';
import styled from 'styled-components';

import { defaultTheme, withTheme } from '../theme';

//
// Text
//

function backupTheme(props) {
	// TODO(jafulfor): Find why theme is only provided on web via styled components
	const hasTheme = Boolean(Object.keys(props.theme).length);
	return {
		...props,
		theme: hasTheme ? props.theme : defaultTheme,
	};
}

export const StyledText = withTheme(styled(Text).attrs(backupTheme)`
	fontFamily: ${({ theme }) => theme.fonts.primary};
	font-family: ${({ theme }) => theme.fonts.primary};
`);

const ParagraphText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textMain};
	marginTop: 10; margin-top: 10px;
`);
// Primary
export const PrimaryText = withTheme(styled(ParagraphText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textMain};
	fontSize: 28; font-size: 28px;
`); // TODO(jafulfor): font-size

export const PrimaryCenterText = withTheme(styled(PrimaryText).attrs(backupTheme)`
	textAlign: center; text-align: center;
`);

// Secondary
export const SecondaryText = withTheme(styled(ParagraphText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textMain};
	fontSize: 18; font-size: 18px;
`);
export const SecondaryCenterText = withTheme(styled(SecondaryText).attrs(backupTheme)`
	textAlign: center; text-align: center;
`);

// Ternary
export const MainText = withTheme(styled(ParagraphText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textSubtle};
	fontSize: 15; font-size: 15px;
`); // TODO(jafulfor): font-size

export const MainCenterText = withTheme(styled(MainText).attrs(backupTheme)`
	textAlign: center; text-align: center;
`);

//
// Special
//
export const ShabbatText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textMain};
	fontSize: ${({ theme }) => theme.size.title};
	font-size: ${({ theme }) => theme.size.title}px;
	margin: 5px;
	textAlign: center; text-align: center;
`);

export const ShabbatSubtitleText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textSubtle};
	fontSize: ${({ theme }) => theme.size.subtitle};
	font-size: ${({ theme }) => theme.size.subtitle}px;
	textAlign: center; text-align: center;
`);

export const AppTitleText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textSubtle};
	fontSize: 32; font-size: 32px;
	textAlign: center; text-align: center;
`); // TODO(jafulfor): font-size

export const CopyrightText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textSubtle};
	textAlign: center; text-align: center;
	fontSize: 18; font-size: 18px;
`); // TODO(jafulfor): font-size

export const HolidayHeadingText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textSubtle};
	fontSize: 26; font-size: 26px;
	textAlign: center; text-align: center;
`); // TODO(jafulfor): font-size

export const HolidayTitleText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textMain};
	fontSize: 24; font-size: 24px;
	textAlign: center; text-align: center;
`); // TODO(jafulfor): font-size

export const HolidaySubtitleText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textSubtle};
	fontSize: ${({ theme }) => theme.size.subtitle};
	font-size: ${({ theme }) => theme.size.subtitle}px;
	textAlign: center; text-align: center;
`);

export const OmerPromptText = withTheme(styled(StyledText).attrs(backupTheme)`
	color: ${({ theme }) => theme.colors.textMain};
	fontSize: 24; font-size: 24px;
	textAlign: center; text-align: center;
`); // TODO(jafulfor): font-size

//
// Containers
//
export const CenteredContainer = withTheme(styled(View).attrs(backupTheme)`
	flex: 1; display: flex;
	justifyContent: center; justify-content: center;
	alignItems: center; align-items: center;
`);

export const BackgroundView = withTheme(styled(View).attrs(backupTheme)`
	height: 100%;

	backgroundColor: ${({ theme }) => theme.colors.background};
	background-color: ${({ theme }) => theme.colors.background};
`);

export const Footer = withTheme(styled(View).attrs(backupTheme)`
	backgroundColor: ${({ theme }) => theme.colors.background};
	background-color: ${({ theme }) => theme.colors.background};

	position: absolute;
	bottom: 0;
	width: 100%;
	paddingVertical: 10; padding-vertical: 10px;
	paddingHorizontal: 20; padding-horizontal: 20px;

	flex: 1; display: flex;
	flexDirection: row; flex-direction: row;
	justifyContent: space-between; justify-content: space-between;
`);
