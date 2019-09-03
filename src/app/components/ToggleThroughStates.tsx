import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

function toggleThroughStates({
	children, cycleRate = 10000,
}: { children: ReactNode[], cycleRate?: number }) {
	const [state, setState] = useState(0);
	useEffect(() => {
		const timerId = setTimeout(
			() => {
				setState((state + 1) % children.length);
			},
			cycleRate,
		);
		return () => clearInterval(timerId);
	}, 		     [children.length, cycleRate, state]);

	return (
		<TouchableWithoutFeedback
			onPress={() => setState((state + 1) % children.length)}
		>
			<View>
				{children[state]}
			</View>
		</TouchableWithoutFeedback>
	);
}

export default toggleThroughStates;
