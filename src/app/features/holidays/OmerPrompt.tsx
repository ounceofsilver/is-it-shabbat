import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { IHoliday } from '../../../core/store/holiday';
import { getHolidays } from '../../custom-selectors';
import { OmerPromptText } from '../../elements/styles';
import { getTime } from '../../time';
import getOmer from '../omer/utilities/getOmer';

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
		omerHoliday: getOmer(getHolidays(state), getTime()),
	}),
)(PureOmerPrompt);
