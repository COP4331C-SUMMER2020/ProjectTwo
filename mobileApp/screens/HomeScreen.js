import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class HomeScreen extends React.Component {

    state = {
        email: "",
        displayName: ""
    }

    componentDidMount() {

    }

    signOutUser = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Hi {this.state.email}!</Text>

                <TouchableOpacity style={{marginTop: 32}} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
