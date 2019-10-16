import React, { useEffect } from 'react';
import { ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { setGlobal, useGlobal } from 'reactn';

interface IGlobalCycle {
	cycle: number;
}
setGlobal<IGlobalCycle>({
	cycle: 0,
});

function toggleThroughStates({
	children, cycleRate = 10000,
}: { children: ReactNode[], cycleRate?: number }) {
	const [state, setState] = useGlobal<IGlobalCycle>('cycle');
	useEffect(() => {
		const timerId = setTimeout(
			() => {
				setState(state + 1);
			},
			cycleRate,
		);
		return () => clearInterval(timerId);
	}, 		     [children.length, cycleRate, state]);

	return (
		<TouchableWithoutFeedback
			onPress={() => setState(state + 1)}
		>
			<View>
				{children[state % children.length]}
			</View>
		</TouchableWithoutFeedback>
	);
}

export default toggleThroughStates;
