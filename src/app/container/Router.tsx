import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import i18n from 'i18n-js';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { colors } from '../theme';

const NavigationOptions = {
	headerStyle: {
		backgroundColor: colors.background,
	},
	headerTintColor: '#ffffff',
};

const Stack = createNativeStackNavigator();

export const Router = () => {

	return (<NavigationContainer>
		<Stack.Navigator
			initialRouteName='Home'
			screenOptions={{ gestureEnabled: false }}
		>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Settings'
				component={SettingsScreen}
				options={{
					title: i18n.t('screens.settings'),
					...NavigationOptions,
				}}
			/>
		</Stack.Navigator>
	</NavigationContainer>);
};
