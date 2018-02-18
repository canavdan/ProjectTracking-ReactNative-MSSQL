import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MenuBar from '../component/MenuBar';
export default class Contact extends React.Component {
    constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }
  handlePress(){
    this.props.navigation.navigate('DrawerOpen');
  }
   static navigationOptions = {
    tabBarLabel: 'Iletisim',
    drawerIcon: ({tintColor }) => {
      return (
       <View>
        <Icon
        size={25}
          raised
          name="contacts"
          type="materialicons"
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

          <Text>iletisim.</Text>
         
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

AppRegistry.registerComponent('native1', () => Contact);
