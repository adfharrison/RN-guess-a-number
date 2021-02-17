import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import Colors from '../constants/colors';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid,
        }),
      }}
    >
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 50,

    alignItems: 'center',
    justifyContent: 'center',
  },

  headerIos: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
});

export default Header;
