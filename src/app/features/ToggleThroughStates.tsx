import React, { useEffect } from 'react';
import { ReactNode } from 'react';
import { Pressable, TouchableWithoutFeedback, View } from 'react-native';
import { setGlobal, useGlobal } from 'reactn';

interface IGlobalCycle {
	cycle: number;
}
setGlobal<IGlobalCycle>({
	cycle: 0,
});

function ToggleThroughStates({
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
		<Pressable
			onPressIn={() => setState(state + 1)}
			hitSlop={20}
		>
			<View>
				{children[state % children.length]}
			</View>
		</Pressable>
	);
}

export default ToggleThroughStates;
