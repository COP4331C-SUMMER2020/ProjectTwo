/*
import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />
  });

  constructor(props) {
    super(props);
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    const recipes = [
      {
        name: "Arroz con leche",
        info: "60 min | 4 servings",
        image: require("../../../assets/images/arrozConLeche.jpg"),
      },
      {
        name: "Ropa vieja",
        info: "30 min | 3 servings",
        image: require("../../../assets/images/ropaVieja.jpg"),
      },
      {
        name: "Pancakes",
        info: "60 min | 2 servings",
        image: require("../../../assets/images/pancakes.jpg"),
      },
    ];
  
    return (
      <Container>
      <StatusBar barStyle="light-content"/>
      <RecipeBackground source={require("../../../assets/images/main.jpg")}>
        <SafeAreaView>
          <MainRecipe>
            <Text title heavy ></Text>
            <Text bold></Text>
            <Text></Text>
          </MainRecipe>
          <Button>
            <Text bold small></Text>
          </Button>
        </SafeAreaView>
      </RecipeBackground>
      <RecipesContainer>
        <Text dark heavy large>
          Recipes
        </Text>
        <Text dark small>
          3 recipes available
        </Text>
        <Recipes>
          {recipes.map((recipe, index) => {
            return(
              <Recipe key={index}>
                <RecipeImage source={recipe.image}/>
                <RecipeInfo>
                  <Text dark bold>{recipe.name}</Text>
                  <Text dark small>{recipe.info}</Text>
                </RecipeInfo>
                <AntDesign name="hearto" size={18} color="#000"/>
              </Recipe>
            );
          })}
        </Recipes>
      </RecipesContainer>
    </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const RecipeBackground = styled.ImageBackground`
  width: 100%;
`;

const MenuBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const Back = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MainRecipe = styled.View`
  padding: 0 32px;
  margin: 200px 0 32px 0;
  `;

  const Divider = styled.View`
    border-bottom-color: #FFF;
    border-bottom-width: 2px;
    width: 150px;
    margin: 0px 0;
  `;

  const Button = styled.TouchableOpacity`
    margin: 0 0 48px 32px;
    background-color: rgba(255, 255, 255, 0.3);
    align-self: flex-start;
    padding: 6px 18px;
    border-radius: 100px;
  `;

  const RecipesContainer = styled.View`
    margin-top: -50px;
    padding: 32px;
    background-color: #fff;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
  `;

  const Recipes = styled.View`
    margin-top: 16px;
  `;

  const Recipe = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
  `;

  const RecipeImage = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 8px;
  `;

  const RecipeInfo = styled.View`
    flex: 1;
    margin-left: 12px;
  `;
*/



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
