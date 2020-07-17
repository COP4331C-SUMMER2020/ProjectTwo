
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Test from './screens/Test';
import Test2 from './screens/Test2';

import { AppRegistry } from 'react-native';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'TestingScreen2'>
      <Stack.Screen headerTitleAlign = 'center' name='TestingScreen' component={Test} />
      <Stack.Screen headerTitleAlign = 'center' Title = 'Test1' name='TestingScreen2' component={Test2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
