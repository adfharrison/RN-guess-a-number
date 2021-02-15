import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import Colors from '../constants/colors';
import NumberContainer from '../components/numberContainer';
import Card from '../components/card';
import generateRandomBetween from '../functions/generateRandomBetween';

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'higher' && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        "Don't lie!",
        "You know that's wrong..."[{ text: 'sorry', style: 'cancel' }]
      );
      return;
    }
    if (direction === 'lower') {
      generateRandomBetween();
    }
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='Lower' onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button
          title='Higher'
          onPress={nextGuessHandler.bind(this, 'higher')}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    width: 300,
    maxWidth: '80%',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default GameScreen;
