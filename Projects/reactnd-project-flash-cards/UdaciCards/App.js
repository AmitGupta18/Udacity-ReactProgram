import * as React from "react";
import { View, Text, StatusBar, Platform } from "react-native";
import DeckList from "./components/DeckList";
import Constants from "expo-constants";
import { purple, lightGray, white } from "./utils/colors";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import NewDeck from "./components/NewDeck";
import Deck from "./components/Deck";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import NewQuestion from "./components/NewQuestion";
import Store from "./store";

const Tabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Deck List",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      headerShown: false,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0,0,0,0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

const MainNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        headerShown: false,
      }),
    },
    Deck: {
      screen: Deck,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
    NewQuestion: {
      screen: NewQuestion,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        },
      }),
    },
  })
);

export default function App() {
  return (
    <Store>
      <View style={{ flex: 1, backgroundColor: lightGray }}>
        <View
          style={{
            backgroundColor: purple,
            height: Constants.statusBarHeight,
          }}
        >
          <StatusBar
            translucent
            backgroundColor={purple}
            barStyle="light-content"
          />
        </View>
        <MainNavigator />
      </View>
    </Store>
  );
}
