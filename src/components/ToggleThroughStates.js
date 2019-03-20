import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';

class ToggleThroughStates extends Component {
	state = {
		toggleState: 0,
	};

	render() {
		const { toggleState } = this.state;
		const { children } = this.props;
		return (
			<TouchableWithoutFeedback
				onPress={() => this.setState({ toggleState: (toggleState + 1) % children.length })}
			>
				<View>
					{children[toggleState]}
				</View>
			</TouchableWithoutFeedback>
		); // show countdown
	}
}

ToggleThroughStates.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ToggleThroughStates;
