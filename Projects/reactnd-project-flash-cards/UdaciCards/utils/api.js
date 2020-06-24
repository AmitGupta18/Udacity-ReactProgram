import { AsyncStorage } from "react-native";

const DECK_STORAGE_KEY = "UdaciCards:decks";

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export function addDeck(deck) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck));
}

export function removeDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}

export function addCard(title, question) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);

    const updatedData = {
      ...data,
      [title]: {
        ...data[title],
        questions: data[title].questions.concat([question]),
      },
    };
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(updatedData));
  });
}
