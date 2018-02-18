import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import About from '../screens/About';
import Projects from '../screens/Projects';
import Contact from '../screens/Contact';
import Login from '../screens/Login';
import ProjectInfo from '../screens/ProjectInfo';
import SaleInfo from '../screens/SaleInfo';
import Logout from '../screens/Logout';
/* export const Navigator = StackNavigator({
   Main: { screen: HomeScreen },
  Profile: { screen: Login },
}); */
export const MainScreenNavigator = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    About: {
      screen: About,
    },
    Projects: {
      screen: Projects,
    },
    Contact: {
      screen: Contact,
    },
    Logout: {
      screen: Logout,
    },
  },
  {
    drawerWidth: 225,
    contentOptions: {
      activeBackgroundColor: '#0a78dd',
      inactiveTintColor: '#f6f3f1',
      activeTintColor: '#f6f3f1',
      style: {
        backgroundColor: '#151515',
        flex: 1,
      },
    },
  },
);

const { height, width } = Dimensions.get('window');
const Navigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
  Home: {
    screen: MainScreenNavigator,
    navigationOptions: { header: null },
  },
  ProjectInfo: {
    screen: ProjectInfo,
    navigationOptions: {
      title: 'Project Info',
    },
  },
  SaleInfo: {
    screen: SaleInfo,
    navigationOptions: {
      title: 'Sale Info',
    },
  },
});

export default Navigator;
