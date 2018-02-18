import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';
let { height, width } = Dimensions.get('window');

const Header = () => <View style={styles.header} />;

export default Header;

const styles = StyleSheet.create({
  header: {
    width,
    paddingTop: Constants.statusBarHeight,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
});

