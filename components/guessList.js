import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const GuessList = (props) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listText}>Guess #{props.round}: </Text>
      <Text style={styles.listText}>{props.guess}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  listText: {
    fontFamily: 'open-sans',
    fontSize: 20,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    width: '60%',
  },
});
export default GuessList;
