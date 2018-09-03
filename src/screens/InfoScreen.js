import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

import Styles from "../Styles";

export default class InfoScreen extends Component {
    render() {
        return (
            <View
                style={{
                    height: "100%",
                    backgroundColor: Styles.colors.background,
                    paddingVertical: 20,
            }}>
                <Text style={[Styles.title, Styles.center, {fontSize: 24}]}>
                    Copyright 2018, James Fulford
                </Text>
                <Text style={{
                    ...Styles.subtitle,
                    ...Styles.center
                }}>
                    Concept and styles from Jessica Fulford.
                </Text>
            </View>
        )
    }
}
