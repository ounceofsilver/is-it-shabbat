import React from 'react';
import { Component, ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

class ToggleThroughStates extends Component {
	public state: { toggleState: number } = {
		toggleState: 0,
	};

	public props: {
		children: ReactNode[],
	};

	public render(): ReactNode {
		const { toggleState } = this.state;
		return (
			<TouchableWithoutFeedback
				onPress={() => this.setState({ toggleState: (toggleState + 1) % this.props.children.length })}
			>
				<View>
					{this.props.children[toggleState]}
				</View>
			</TouchableWithoutFeedback>
		); // show countdown
	}
}

export default ToggleThroughStates;
