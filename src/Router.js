import {
    createStackNavigator
} from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Styles from "./Styles";

const NavigationOptions = {
    headerTintColor: '#ffffff',
    headerStyle: {
        backgroundColor: Styles.colors.background,
    }
};

export default Router = createStackNavigator({
    // Name the screen
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            title: "Settings",
            ...NavigationOptions,
        }
    }
}, {
    initialRouterName: 'Home'
});
