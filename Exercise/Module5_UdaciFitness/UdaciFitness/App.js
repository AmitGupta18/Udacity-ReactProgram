import * as React from "react";
import { View, Text } from "react-native";
import AddEntry from "./components/AddEntry";

export default class App extends React.Component {
  componentDidMount() {
    console.log("before");
    debugger;
    console.log("after");
  }
  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}
