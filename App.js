import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/header';
import StartGameSCreen from './screens/startGameScreen';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title={'Guess a Number!'} />
      <StartGameSCreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
