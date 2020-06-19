import React from "react";
import { View, StyleSheet } from "react-native";

export default function App() {
  // flex: 2  says "make sure that the middle sibling is twice
  // as large along the Main Axis as the first and third children

  return (
    <View style={styles.container}>
      <View style={[styles.box, { flex: 1 }]} />
      <View style={[styles.box, { flex: 2, alignSelf: "flex-end" }]} />
      <View style={[styles.box, { flex: 1 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "#e76e63",
    margin: 10,
  },
});
