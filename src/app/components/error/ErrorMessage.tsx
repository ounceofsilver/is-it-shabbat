import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getError } from '../../../core/store/get';
import { setError as _setError } from '../../../core/store/use/error';
import { CenteredContainer, MainCenterText } from '../../Styles';

function errorMessage({ message, setError }: { message: string, setError: (s: string) => void }) {
	useEffect(() => {
		setTimeout(() => {
			setError('');
		},         10000);
	},        [message]);

	if (!message) { return null; }

	return (
		<CenteredContainer>
			<MainCenterText>
				{message}
			</MainCenterText>
		</CenteredContainer>
	);
}

export default connect(
	state => ({ message: getError(state) }),
	{ setError: _setError },
)(errorMessage);
