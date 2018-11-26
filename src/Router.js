import {
	createStackNavigator,
	createAppContainer
} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import InfoScreen from './screens/InfoScreen';
import { colors } from './Styles';

const NavigationOptions = {
	headerTintColor: '#ffffff',
	headerStyle: {
		backgroundColor: colors.background,
	},
};

export default Router = createAppContainer(createStackNavigator({
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
