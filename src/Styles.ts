import {
	Text,
	View,
} from 'react-native';
import styled from 'styled-components';

import { styles } from 'is-it-shabbat-core';

const { fonts, colors, size } = styles;

//
// Text
//
export const StyledText = styled(Text)`
	fontFamily: ${fonts.primary};
`;

const ParagraphText = styled(StyledText)`
	color: ${colors.textMain};
	marginTop: 10;
`;
// Primary
export const PrimaryText = styled(ParagraphText)`
	color: ${colors.textMain};
	fontSize: 28;
`;
export const PrimaryCenterText = styled(PrimaryText)`
	textAlign: center;
`;

// Secondary
export const SecondaryText = styled(ParagraphText)`
	color: ${colors.textMain};
	fontSize: 18;
`;
export const SecondaryCenterText = styled(SecondaryText)`
	textAlign: center;
`;

// Ternary
export const MainText = styled(ParagraphText)`
	color: ${colors.textSubtle};
	fontSize: 15;
`;
export const MainCenterText = styled(MainText)`
	textAlign: center;
`;

//
// Special
//
export const ShabbatText = styled(StyledText)`
	color: ${colors.textMain};
	fontSize: ${size.title};
	margin: 5px;
	textAlign: center;
`;

export const ShabbatSubtitleText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: ${size.subtitle};
	textAlign: center;
`;

export const AppTitleText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: 32;
	textAlign: center;
`;

export const CopyrightText = styled(StyledText)`
	color: ${colors.textSubtle};
	textAlign: center;
	fontSize: 18;
`;

export const HolidayHeadingText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: 26;
	textAlign: center;
`;
export const HolidayTitleText = styled(StyledText)`
	color: ${colors.textMain};
	fontSize: 24;
	textAlign: center;
`;
export const HolidaySubtitleText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: ${size.subtitle};
	textAlign: center;
`;

export const OmerPromptText = styled(StyledText)`
	color: ${colors.textMain};
	fontSize: 24;
	textAlign: center;
`;
//
// Containers
//
export const CenteredContainer = styled(View)`
	flex: 1;
	justifyContent: center;
	alignItems: center;
`;
export const BackgroundView = styled(View)`
	height: 100%;
	backgroundColor: ${colors.background};
`;

export const Footer = styled(View)`
	backgroundColor: ${colors.background};

	position: absolute;
	bottom: 0;
	width: 100%;
	paddingVertical: 10;
	paddingHorizontal: 20;

	flex: 1;
	flexDirection: row;
	justifyContent: space-between;
`;

export default {};
