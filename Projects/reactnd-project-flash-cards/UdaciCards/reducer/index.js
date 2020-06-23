const { useReducer } = require("react");

export const ADD_DECKS = "ADD_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const ADD_CARD = "ADD_CARD";

const Reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      const { deck } = action;
      return {
        ...state,
        ...deck,
      };
    case REMOVE_DECK:
      const { title } = action;
      delete state[title];
      return {
        ...state,
      };
    case ADD_CARD:
      const { deckTitle, question } = action;
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: state[deckTitle].questions.concat([question]),
        },
      };
    default:
      return state;
  }
};

export default Reducer;
