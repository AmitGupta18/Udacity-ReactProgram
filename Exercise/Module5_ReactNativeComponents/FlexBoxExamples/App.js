import React from "react";
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <View style={styles.box} />
      <View style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-around", //flex-start | center | flex-end | space-between
    alignItems: "stretch", //flex-start | center | flex-end
  },
  box: {
    height: 50,
    //  width: 50,
    backgroundColor: "#e76e63",
    margin: 10,
  },
});
