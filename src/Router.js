import {
	createStackNavigator,
	createAppContainer,
} from 'react-navigation';
import { styles } from 'is-it-shabbat-core';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import InfoScreen from './screens/InfoScreen';


const NavigationOptions = {
	headerTintColor: '#ffffff',
	headerStyle: {
		backgroundColor: styles.colors.background,
	},
};

export default createAppContainer(createStackNavigator({
	// Name the screen
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			header: null,
		},
	},
	Settings: {
		screen: SettingsScreen,
		navigationOptions: {
			title: 'Settings',
			...NavigationOptions,
		},
	},
	Info: {
		screen: InfoScreen,
		navigationOptions: {
			title: 'App Information',
			...NavigationOptions,
		},
	},
}, {
	initialRouterName: 'Home',
}));
