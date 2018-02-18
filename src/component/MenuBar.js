import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Constants } from 'expo';
import { Button, Icon } from 'react-native-elements';

const { height, width } = Dimensions.get('window');
export default class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { a: null };
  }

  render() {
    return (
      <View style={styles.menuBar}>
        <Icon
          onPress={this.props.onP}
          size={15}
          raised
          name="menu"
          type="entypoe"
          color="#444d56"
        />
        <Text style={{ color: '#f0f8ff', textAlign: 'center', fontSize: 25, marginTop: 5 }}>
          Company Software
        </Text>
      </View>
    );
  }
}
/* const MenuBar = () => <View style={styles.menuBar}

>
  <Button
    onPress={this.props.onP}
    raised
    width={40}
    hei
    icon={{ name: 'cached' }}
    title="BUTTON WITH ICON"
  />
</View>;

export default MenuBar; */

const styles = StyleSheet.create({
  menuBar: {
    flexDirection: 'row',
    width,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});
