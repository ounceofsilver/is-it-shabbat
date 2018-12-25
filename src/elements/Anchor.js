import React, { Component } from 'react';
import { Linking, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class Anchor extends Component {
	render() {
		const { href, children } = this.props;
		return (
			<Text
				style={{ textDecorationLine: 'underline' }}
				onPress={async () => {
					Linking.openURL(href);
				}}
			>
				{children}
			</Text>
		);
	}
}
Anchor.propTypes = {
	href: PropTypes.string.isRequired,
	children: PropTypes.node,
};
Anchor.defaultProps = {
	children: '',
};
