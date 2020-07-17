import React from 'react';
import { Button, ThemeProvider } from 'react-native-elements';

const Test2 = ({ navigation }) => {
    return (
      <ThemeProvider>
        <Button title="aye lmao 2!" onPress={() => navigation.navigate('TestingScreen')}/>
      </ThemeProvider>
    );
}

export default Test2;
