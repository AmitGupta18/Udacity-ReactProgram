import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Context } from "../store";
import { lightGray, white, red, green, black, purple } from "../utils/colors";
import Card from "./Card";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../utils/notifications";

const Quiz = (props) => {
  const [state, dispatch] = useContext(Context);

  const [deckDetails, setDeckDetails] = useState({
    questionIdx: 0,
    numCorrect: 0,
  });

  useEffect(() => {
    clearLocalNotification().then(setLocalNotification);
  }, []);

  const onCorrect = () => {
    const { questionIdx, numCorrect } = deckDetails;
    setDeckDetails({
      ...deckDetails,
      numCorrect: numCorrect + 1,
      questionIdx: questionIdx + 1,
    });
  };

  const onIncorrect = () => {
    const { questionIdx } = deckDetails;
    setDeckDetails({
      ...deckDetails,
      questionIdx: questionIdx + 1,
    });
  };

  const restartQuiz = () => {
    setDeckDetails({
      questionIdx: 0,
      numCorrect: 0,
    });
  };

  const backToDeck = () => {
    props.navigation.goBack();
  };

  const deckTitle = props.navigation.getParam("deckTitle");
  const questions = state[deckTitle] ? state[deckTitle].questions : [];
  const { questionIdx, numCorrect } = deckDetails;

  if (questions.length > 0) {
    return (
      <View style={styles.container}>
        {questionIdx + 1 > questions.length ? (
          <View style={{ flex: 1 }}>
            <View style={styles.stats}>
              <Text style={styles.statsText}>{`Correct -> ${numCorrect}`}</Text>
              <Text style={styles.statsText}>
                {`Total ->  ${questions.length}`}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
                  styles.resultBtn,
                ]}
                onPress={restartQuiz}
              >
                <Text style={styles.btnText}> Restart Quiz </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
                  styles.resultBtn,
                ]}
                onPress={backToDeck}
              >
                <Text style={styles.btnText}> Back To Deck </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>
              <Text style={styles.remainingQueText}>
                {`Remaining cards in deck: ${
                  questions.length - questionIdx - 1
                }`}
              </Text>
              <Card {...questions[questionIdx]} />
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
                  styles.correctButton,
                ]}
                onPress={onCorrect}
              >
                <Text style={styles.btnText}> Correct </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btn,
                  Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
                  styles.incorrectButton,
                ]}
                onPress={onIncorrect}
              >
                <Text style={styles.btnText}> Incorrect </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.stats}>
      <Text style={{ fontSize: 25, textAlign: "center" }}>
        Sorry, you cannot take a quiz because there are no cards in the deck
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightGray,
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  stats: {
    backgroundColor: lightGray,
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
  },
  statsText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  resultBtn: {
    backgroundColor: purple,
    borderWidth: 1,
    borderColor: black,
  },
  remainingQueText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    padding: 10,
    height: 45,
    margin: 10,
    justifyContent: "center",
  },
  iosBtn: {
    borderRadius: 7,
    marginLeft: 40,
    marginRight: 40,
  },
  androidBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
  },
  correctButton: {
    backgroundColor: green,
    borderWidth: 1,
    borderColor: green,
  },
  incorrectButton: {
    backgroundColor: red,
    borderWidth: 1,
    borderColor: red,
  },
  btnText: {
    color: white,
    fontSize: 18,
    textAlign: "center",
  },
});

export default Quiz;
