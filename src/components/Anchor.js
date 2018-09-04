import React, {
    Component
} from 'react';
import { Linking, Text } from 'react-native';

export default class Anchor extends Component {
    _handlePress = () => {
        Linking.openURL(this.props.href);
        this.props.onPress && this.props.onPress();
    };

    render() {
        return (
            <Text
                { ...this.props }
                style={{textDecorationLine: "underline", ...this.props.style}}
                onPress={this._handlePress}
            >
                {this.props.children}
            </Text>
        );
    }
}
