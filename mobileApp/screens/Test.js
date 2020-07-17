import React from 'react';
import { Button, ThemeProvider } from 'react-native-elements';

const Test = ({ navigation }) => {
    return (
      <ThemeProvider>
        <Button title="yooooo!" onPress={() => navigation.navigate('TestingScreen2')}/>
      </ThemeProvider>
    );
}

export default Test;
