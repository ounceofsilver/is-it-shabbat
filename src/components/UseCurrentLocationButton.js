import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
} from 'react-native';
import { connect } from 'react-redux';

import {
	action,
	localization,
} from 'is-it-shabbat-core';

import getLocationAsync from '../utilities/getLocation';

const { en: { translate } } = localization;

const UseCurrentLocationButton = ({ dispatch }) => (
	<Button
		title={translate.settings.location.useCurrentLocation}
		onPress={async () => {
			dispatch(action.setLocation(await getLocationAsync()));
		}}
	/>
);
UseCurrentLocationButton.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

export default connect(() => ({}))(UseCurrentLocationButton);
