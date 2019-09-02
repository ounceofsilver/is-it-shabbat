import { getHolidays, getNow } from 'is-it-shabbat-core/dist/store/get';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { OmerPromptText } from '../../Styles';
import { IHoliday } from '../holidays/types';
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
		omerHoliday: getOmer(getHolidays(state), getNow(state)),
	}),
)(PureOmerPrompt);
