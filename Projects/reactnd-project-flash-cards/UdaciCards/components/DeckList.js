import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { lightGray, black, white } from "../utils/colors";
import { fetchDecks } from "../utils/api";
import { Context } from "../store";
import { ADD_DECKS } from "../reducer";
import { AppLoading } from "expo";

function DeckList(props) {
  const [state, dispatch] = useContext(Context);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchDecks()
      .then((result) => {
        if (result !== null) {
          dispatch({ type: ADD_DECKS, decks: JSON.parse(result) });
        }
      })
      .then(() => setReady(true));
  }, []);

  const renderItem = ({ item }) => {
    const deck = state[item];
    return (
      <View style={styles.listItem}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Deck", {
              deckTitle: deck.title,
              questions: deck.questions,
            })
          }
        >
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            {deck.title}
          </Text>
          <Text style={{ fontSize: 20, textAlign: "center" }}>
            {deck.questions.length} cards
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (ready === false) {
    <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {Object.keys(state).length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noDecksText}>
            Sorry, there are no decks available. Please create a new deck!
          </Text>
        </View>
      ) : (
        <FlatList
          data={Object.keys(state)}
          renderItem={renderItem}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightGray,
    paddingTop: 20,
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDecksText: {
    textAlign: "center",
    fontSize: 25,
  },
  listItem: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default DeckList;
