import {
	Text,
	View,
} from 'react-native';
import styled from 'styled-components';

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

//
// Text
//
export const StyledText = styled(Text)`
	fontFamily: ${fonts.primary}; font-family: ${fonts.primary};
`;

const ParagraphText = styled(StyledText)`
	color: ${colors.textMain};
	marginTop: 10; margin-top: 10px;
`;
// Primary
export const PrimaryText = styled(ParagraphText)`
	color: ${colors.textMain};
	fontSize: 28; font-size: 28px;
`;
export const PrimaryCenterText = styled(PrimaryText)`
	textAlign: center; text-align: center;
`;

// Secondary
export const SecondaryText = styled(ParagraphText)`
	color: ${colors.textMain};
	fontSize: 18; font-size: 18px;
`;
export const SecondaryCenterText = styled(SecondaryText)`
	textAlign: center; text-align: center;
`;

// Ternary
export const MainText = styled(ParagraphText)`
	color: ${colors.textSubtle};
	fontSize: 15; font-size: 15px;
`;
export const MainCenterText = styled(MainText)`
	textAlign: center; text-align: center;
`;

//
// Special
//
export const ShabbatText = styled(StyledText)`
	color: ${colors.textMain};
	fontSize: ${size.title}; font-size: ${size.title}px;
	margin: 5px;
	textAlign: center; text-align: center;
`;

export const ShabbatSubtitleText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: ${size.subtitle}; font-size: ${size.subtitle}px;
	textAlign: center; text-align: center;
`;

export const AppTitleText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: 32; font-size: 32px;
	textAlign: center; text-align: center;
`;

export const CopyrightText = styled(StyledText)`
	color: ${colors.textSubtle};
	textAlign: center; text-align: center;
	fontSize: 18; font-size: 18px;
`;

export const HolidayHeadingText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: 26; font-size: 26px;
	textAlign: center; text-align: center;
`;
export const HolidayTitleText = styled(StyledText)`
	color: ${colors.textMain};
	fontSize: 24; font-size: 24px;
	textAlign: center; text-align: center;
`;
export const HolidaySubtitleText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: ${size.subtitle}; font-size: ${size.subtitle}px;
	textAlign: center; text-align: center;
`;

export const OmerPromptText = styled(StyledText)`
	color: ${colors.textMain};
	fontSize: 24; font-size: 24px;
	textAlign: center; text-align: center;
`;
//
// Containers
//
export const CenteredContainer = styled(View)`
	flex: 1; display: flex;
	justifyContent: center; justify-content: center;
	alignItems: center; align-items: center;
`;
export const BackgroundView = styled(View)`
	height: 100%;

	backgroundColor: ${colors.background}; background-color: ${colors.background};
`;

export const Footer = styled(View)`
	backgroundColor: ${colors.background}; background-color: ${colors.background};

	position: absolute;
	bottom: 0;
	width: 100%;
	paddingVertical: 10; padding-vertical: 10px;
	paddingHorizontal: 20; padding-horizontal: 20px;

	flex: 1; display: flex;
	flexDirection: row; flex-direction: row;
	justifyContent: space-between; justify-content: space-between;
`;
