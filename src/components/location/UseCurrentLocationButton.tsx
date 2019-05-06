import i18n from 'i18n-js';
import { action } from 'is-it-shabbat-core';
import React from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';

import getLocation from './getLocation';

const UseCurrentLocationButton = ({ dispatch }: { dispatch: (action: any) => void }) => (
	<Button
		title={i18n.t('settings.location.useCurrentLocation')}
		onPress={async () => {
			dispatch(action.setLocation(await getLocation()));
		}}
	/>
);

export default connect(() => ({}))(UseCurrentLocationButton);
