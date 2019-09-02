import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { getHolidays, getNow } from '../../../core/store/get';
import { OmerPromptText } from '../../Styles';
import getOmer from '../omer/utilities/getOmer';
import { IHoliday } from './types';

interface IExternalOmerPromptProps {
	goToOmerPage: () => void;
}

interface IOmerPromptProps {
	omerHoliday: IHoliday;
}

export const PureOmerPrompt = ({
	omerHoliday, goToOmerPage,
}: IOmerPromptProps & IExternalOmerPromptProps) => (
	omerHoliday && <>
		<TouchableWithoutFeedback onPress={goToOmerPage}>
			<View style={{ marginTop: 40 }}>
				<OmerPromptText>Count the</OmerPromptText>
				<OmerPromptText>{omerHoliday.title}</OmerPromptText>
			</View>
		</TouchableWithoutFeedback>
	</>
);

export default connect(
	state => ({
		omerHoliday: getOmer(getHolidays(state), getNow(state)),
	}),
)(PureOmerPrompt);
