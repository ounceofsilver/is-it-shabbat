import React from 'react';
import PropTypes from 'prop-types';
import {
	Button,
} from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import {
	action,
} from 'is-it-shabbat-core';

import getLocationAsync from '../utilities/getLocation';


const UseCurrentLocationButton = ({ dispatch }) => (
	<Button
		title={i18n.t('settings.location.useCurrentLocation')}
		onPress={async () => {
			dispatch(action.setLocation(await getLocationAsync()));
		}}
	/>
);
UseCurrentLocationButton.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

export default connect(() => ({}))(UseCurrentLocationButton);
