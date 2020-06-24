import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { black, white, lightGray, red } from "../utils/colors";
import { Context } from "../store";
import { REMOVE_DECK } from "../reducer";
import { removeDeck } from "../utils/api";

const Deck = (props) => {
  const [state, dispatch] = useContext(Context);

  const deleteDeck = (title) => {
    removeDeck(title);
    dispatch({ type: REMOVE_DECK, title });
    toHome();
  };

  const toHome = () => {
    props.navigation.navigate("DeckList");
  };

  const { deckTitle } = props.navigation.state.params;
  const { questions } = state[deckTitle]
    ? state[deckTitle]
    : props.navigation.state.params;
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 30 }}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>{deckTitle}</Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {questions.length} cards
        </Text>
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <TouchableOpacity
          style={[
            styles.btn,
            Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
            styles.addCardBtn,
          ]}
          onPress={() =>
            props.navigation.navigate("NewQuestion", { deckTitle })
          }
        >
          <Text style={[styles.btnText, { color: black }]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            Platform.OS === "ios" ? styles.iosBtn : styles.androidBtn,
            styles.startQuizBtn,
          ]}
          onPress={() => props.navigation.navigate("Quiz", { deckTitle })}
        >
          <Text style={[styles.btnText, { color: white }]}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => deleteDeck(deckTitle)}
        >
          <Text style={[styles.btnText, { color: red }]}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

Deck.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("deckTitle"),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    padding: 15,
    justifyContent: "space-around",
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
  addCardBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: white,
  },
  startQuizBtn: {
    backgroundColor: black,
    borderWidth: 1,
    borderColor: black,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default Deck;
