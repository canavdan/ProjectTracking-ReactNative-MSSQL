import { Router, Scene, Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { isLogin, setSessionTicket, logOut } from '../common/index';
import MenuBar from '../component/MenuBar';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
      backgroundColor: 'rgba(0, 27, 50, 1)',
      flex:1,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    padding: 20,
    color: 'white',
  },
});

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.navigation.navigate('DrawerOpen');
  }
  static navigationOptions = {
    tabBarLabel: 'Logout',
    drawerIcon: ({ tintColor }) => {
      return (
        <View>
          <Icon
            size={28}
            raised
            name="info"
            type="entypo"
            color="#444d56"
            style={{ backgroundColor: tintColor }}
          />
        </View>
      );
    },
  };
  onPressButton() {
    const { navigate } = this.props.navigation;
    logOut();
     navigate('Login');
  }
  render() {
    return (
      <View style={styles.container}>
        <MenuBar onP={this.handlePress} />
        
          <Text style={{ color: 'rgba(255, 255, 255, 1)' }}>
            Are you sure you want to logout?
          </Text>
          <Text />
          <Text />
          <TouchableHighlight onPress={this.onPressButton.bind(this)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.buttonText}>Yes</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={styles.button}>
              <Text style={styles.buttonText}>No</Text>
            </View>
          </TouchableHighlight>
        </View>
     
    );
  }
}

export default Logout;
