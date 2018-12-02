import React, { Component } from 'react';
import Anchor from '../components/Anchor';
import {
	BackgroundView,
	TitleCenterText,
} from '../Styles';

export default class InfoScreen extends Component {
	render() {
		return (
			<BackgroundView style={{ paddingVertical: 20 }}>
				<TitleCenterText style={{ fontSize: 24 }}>
					{'Copyright 2018, '}
					<Anchor href="https://jamesfulford.com">
						{'James Fulford'}
					</Anchor>
					{' and Jessica Fulford'}
				</TitleCenterText>
			</BackgroundView>
		);
	}
}
