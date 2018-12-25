import {
	Text,
	View,
} from 'react-native';
import styled from 'styled-components';

import { styles } from 'is-it-shabbat-core';

const { fonts, colors, size } = styles;

//
// Constants
//
export const centerStyle = `
	textAlign: center;
`;

//
// Text
//
export const StyledText = styled(Text)`
	fontFamily: ${fonts.primary};
`;

// Primary
export const PrimaryText = styled(StyledText)`
	color: ${colors.textMain};
`;
export const TitleText = styled(PrimaryText)`
	fontSize: ${size.title};
	margin: 5px;
`;
export const TitleCenterText = styled(TitleText)([centerStyle]);

// Subtitle
export const SubtitleText = styled(StyledText)`
	color: ${colors.textSubtle};
	fontSize: ${size.subtitle};
`;

export const SubtitleCenterText = styled(SubtitleText)([centerStyle]);

// Secondary
export const SecondaryText = styled(StyledText)`
	color: ${colors.textMain};
	fontSize: ${size.secondary}
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
