import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from '../../screens/LoadingScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import Home from '../../screens/Home';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAPAnyzPql-wJ6upHn_rXQsJbZeeJBbS1I",
  authDomain: "awesomeproject-fb4ab.firebaseapp.com",
  databaseURL: "https://awesomeproject-fb4ab.firebaseio.com",
  projectId: "awesomeproject-fb4ab",
  storageBucket: "awesomeproject-fb4ab.appspot.com",
  messagingSenderId: "859932230826",
  appId: "1:859932230826:web:22556624cb2090f1903cd3"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
  Home: Home
});

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen

});

export default createAppContainer (
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
);
