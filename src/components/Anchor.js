import React from 'react';
import { Linking, Text } from 'react-native';

export default ({ style, href, onPress, children, ...props }) => (
	<Text
		{...props}
		style={{ textDecorationLine: 'underline', ...style }}
		onPress={async () => {
			Linking.openURL(href);
			if (onPress) {
				onPress();
			}
		}}
	>
		{children}
	</Text>
);
