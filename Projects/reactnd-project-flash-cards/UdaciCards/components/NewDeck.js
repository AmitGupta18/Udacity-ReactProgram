import React, { useState, useContext } from "react";
import {
  Platform,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { white, lightGray, black } from "../utils/colors";
import { addDeck } from "../utils/api";
import { NavigationActions } from "react-navigation";
import { Context } from "../store";
import { ADD_DECK, REMOVE_DECK } from "../reducer";

function NewDeck(props) {
  const [state, dispatch] = useContext(Context);
  const [input, setInput] = useState("");

  const handleChange = (input) => {
    setInput(input);
  };

  const handleSubmit = () => {
    const title = input;
    setInput("");

    const deck = {
      [title]: {
        title,
        questions: [],
      },
    };

    dispatch({ type: ADD_DECK, deck });

    // Save to DB
    addDeck(deck);
    props.navigation.navigate("Deck", { deckTitle: title, questions: [] });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={{ flex: 2 }}>
        <Text style={styles.label}>What is the title of your new deck?</Text>
        <TextInput
          value={input}
          onChangeText={handleChange}
          style={styles.input}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={
            Platform.OS === "ios"
              ? styles.iosSubmitBtn
              : styles.androidSubmitBtn
          }
        >
          <Text style={styles.submitBtnText}>Create Deck</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    padding: 10,
  },
  label: {
    padding: 10,
    fontSize: 34,
    textAlign: "center",
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

export default NewDeck;
