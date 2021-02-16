import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import Fonts from '../constants/fonts';
import Colors from '../constants/colors';
import MainButton from '../components/mainButton';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text style={Fonts.title}>The Game Is Over!</Text>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/success.png')} style={styles.image} />
      </View>
      <View style={styles.resultContainer}>
        <Text style={Fonts.body}>
          Your phone needed
          <Text style={styles.highlight}> {props.rounds}</Text> rounds to guess
          the number <Text style={styles.highlight}>{props.userNumber}</Text>
        </Text>
      </View>

      <MainButton onPress={props.onRestartGame}>New game?</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  resultContainer: {
    marginVertical: 30,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    margin: 30,
  },
});

export default GameOverScreen;
