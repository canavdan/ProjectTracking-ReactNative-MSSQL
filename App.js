import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Navigator from './src/screens/Navigator';
import Header from './src/component/Header';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, marginTop: 0 }}>
        <View style={styles.container}>
          <Header />
          <Navigator />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
