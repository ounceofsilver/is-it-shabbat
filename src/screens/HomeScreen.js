import React, { Component } from 'react';
import {
	ScrollView,
	View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import ShabbatCheck from '../components/ShabbatCheck';
// import state from '../logic/State';
import Styles from '../Styles';

export default class HomeScreen extends Component {
	render() {
		const { navigation: { navigate } } = this.props;
		return (
			<View style={{ height: '100%' }}>
				<ScrollView
					style={{
						backgroundColor: Styles.colors.background,
					}}
				>
					<ShabbatCheck
						style={[Styles.container, { height: 400 }]}
					/>
				</ScrollView>
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						width: '100%',
						paddingVertical: 10,
						paddingHorizontal: 15,

						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View>
						<FontAwesome
							name="cog"
							size={36}
							color={Styles.colors.textSubtle}
							onPress={() => navigate('Settings')}
						/>
					</View>
					<View>
						<FontAwesome
							name="info-circle"
							size={36}
							color={Styles.colors.textSubtle}
							onPress={() => navigate('Info')}
						/>
					</View>
				</View>
			</View>
		);
	}
}
