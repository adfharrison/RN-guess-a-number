import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Colors from '../constants/colors';
import NumberContainer from '../components/numberContainer';
import Card from '../components/card';
import GuessList from '../components/guessList';
import generateRandomBetween from '../functions/generateRandomBetween';
import Fonts from '../constants/fonts';
import MainButton from '../components/mainButton';
import { Ionicons } from '@expo/vector-icons';

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState(0);

  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableWidth, setAvailableWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableHeight, setAvailableHeight] = useState(
    Dimensions.get('window').height
  );

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    const updateLayout = () => {
      setAvailableWidth(Dimensions.get('window').width);
      setAvailableHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'higher' && currentGuess > userChoice)
    ) {
      Alert.alert(
        "Don't lie!",
        "You know that's wrong..."[{ text: 'sorry', style: 'cancel' }]
      );
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currPastGuesses) => [nextNumber, ...currPastGuesses]);
    setRounds((curRounds) => curRounds + 1);
  };

  if (availableHeight < 400) {
    return (
      <View style={styles.screen}>
        <Text style={Fonts.title}>Opponent's guess</Text>
        <View style={styles.control}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          {/* <Card style={styles.buttonContainer}> */}

          <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>

        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => {
              return (
                <GuessList
                  key={guess}
                  guess={guess}
                  round={pastGuesses.length - index}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text style={Fonts.title}>Opponent's guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </Card>
        <View style={styles.listContainer}>
          <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) => {
              return (
                <GuessList
                  key={guess}
                  guess={guess}
                  round={pastGuesses.length - index}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    width: 400,
    maxWidth: '95%',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 500 ? '60%' : '80%',
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default GameScreen;
