import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { lightGray, white, black } from "../utils/colors";
import { Context } from "../store";
import { TouchableOpacity, TextInput } from "react-native-gesture-handler";
import { ADD_CARD } from "../reducer";
import { addCard } from "../utils/api";

const NewQuestion = (props) => {
  const [state, dispatch] = useContext(Context);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    const deckTitle = props.navigation.getParam("deckTitle");
    if (question !== "" && answer !== "") {
      const questionObj = {
        question,
        answer,
      };
      dispatch({ type: ADD_CARD, deckTitle, question: questionObj });
      addCard(deckTitle, questionObj);
      props.navigation.goBack();
    }
  };

  const deck = state[props.navigation.getParam("deckTitle")];
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Text style={styles.title}>Add Card</Text>
        <TextInput
          style={styles.input}
          maxLength={100}
          placeholder="Enter the question here"
          onChangeText={(question) => setQuestion(question.trim())}
        />
        <TextInput
          style={styles.input}
          maxLength={100}
          multiline={true}
          placeholder="Enter the answer here"
          onChangeText={(answer) => setAnswer(answer.trim())}
        />
      </View>
      <View>
        <TouchableOpacity
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

NewQuestion.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("deckTitle"),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    padding: 10,
    justifyContent: "space-around",
  },
  title: {
    color: black,
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 30,
    fontWeight: "bold",
  },
  input: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: lightGray,
    backgroundColor: white,
  },
  iosSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "center",
  },
  submitBtnText: {
    color: white,
    fontSize: 18,
    textAlign: "center",
  },
});

export default NewQuestion;
