import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { red } from "../utils/colors";

function Card(props) {
  const [cardFlipped, setCardFlipped] = useState(false);

  const flipCard = () => {
    setCardFlipped(!cardFlipped);
  };

  const { question, answer } = props;

  return (
    <View>
      <Text style={styles.cardText}>{cardFlipped ? answer : question}</Text>
      <TouchableOpacity onPress={flipCard}>
        <Text style={styles.linkText}>
          {cardFlipped ? "Question" : "Answer"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardText: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 50,
    textAlign: "center",
  },
  linkText: {
    alignSelf: "center",
    fontSize: 30,
    color: red,
    paddingTop: 10,
    fontWeight: "bold",
  },
});

export default Card;
