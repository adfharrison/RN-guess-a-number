import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Card from '../components/card';
import Colors from '../constants/colors';
import Input from '../components/input';
import NumberContainer from '../components/numberContainer';
import Fonts from '../constants/fonts';
import MainButton from '../components/mainButton';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [inputConfirmed, setInputConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setInputConfirmed(false);
  };
  const confirmInputhandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid Number',
        'Number must be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setInputConfirmed(true);
    setEnteredValue('');
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (inputConfirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={Fonts.body}> You selected </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          START GAME
        </MainButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <View style={styles.titleContainer}>
              <Text style={Fonts.title}>Start a New Game!</Text>
            </View>

            <Card style={styles.inputContainer}>
              <Text style={Fonts.body}>Select a number</Text>
              <Input
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType={'number-pad'}
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
                style={styles.input}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title='Reset'
                    onPress={resetInputHandler}
                    color={Colors.secondary}
                    style={{ width: buttonWidth }}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title='Confirm'
                    onPress={confirmInputhandler}
                    color={Colors.primary}
                    style={{ width: buttonWidth }}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  titleContainer: {
    marginVertical: 20,
  },

  inputContainer: {
    minWidth: 300,
    width: '80%',
    maxWidth: '95%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 10,
  },

  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
