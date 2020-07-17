import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default class LoadingScreen extends React.Component {
//    componentDidMount() {


//    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="Large"></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 100,
        justifyContent: "center",
        alignItems: "center"
    }
});
