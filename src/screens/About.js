import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MenuBar from '../component/MenuBar';

export default class About extends React.Component {
    constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }
  handlePress(){
    this.props.navigation.navigate('DrawerOpen');
  }
  static navigationOptions = {
    tabBarLabel: 'About',
    drawerIcon: ({tintColor }) => {
      return (
       <View>
        <Icon
        size={28}
          raised
          name="info"
          type="entypo"
          color="#444d56"
           style={{backgroundColor:tintColor}}
        />
        </View>
      );
    },
  };
  render() {
    return (
      <View style={styles.container}>
         <MenuBar onP={this.handlePress}/>
        <View>
         
          <Text>About</Text>
        
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

AppRegistry.registerComponent('native1', () => About);
