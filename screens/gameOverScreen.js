import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Fonts from '../constants/fonts';
import Colors from '../constants/colors';
import MainButton from '../components/mainButton';

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={Fonts.title}>The Game Is Over!</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/success.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.resultContainer}>
          <Text style={Fonts.body}>
            Your phone needed
            <Text style={styles.highlight}> {props.rounds}</Text> rounds to
            guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </Text>
        </View>

        <MainButton onPress={props.onRestartGame}>New game?</MainButton>
      </View>
    </ScrollView>
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
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 4,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  resultContainer: {
    marginVertical: Dimensions.get('window').height / 60,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    margin: 30,
  },
});

export default GameOverScreen;
