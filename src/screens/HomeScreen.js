import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MenuBar from '../component/MenuBar';

export default class HomeScreen extends React.Component {
    constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }
  handlePress(){
    this.props.navigation.navigate('DrawerOpen');
  }
 static navigationOptions = {
    tabBarLabel: 'Ana Sayfa',
    drawerIcon: ({tintColor }) => {
      return (
        <View>
        <Icon
        size={25}
          raised
          name="home"
          type="entypo"
          color="#444d56"
          style={{backgroundColor:tintColor}}
        />
        </View>
      );
    },
  };
  render() {
    const { navigate } = this.props.navigation;
    const {params}=this.props.navigation.state;
    return (
      <View style={styles.container}>
         <MenuBar onP={this.handlePress}/>
        <View>
          <Text>HOME!</Text>

         
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

AppRegistry.registerComponent('native1', () => HomeScreen);
