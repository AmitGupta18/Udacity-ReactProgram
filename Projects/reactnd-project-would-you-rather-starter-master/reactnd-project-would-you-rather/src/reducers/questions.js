import {
  RECEIVE_QUESTIONS,
  SAVE_ANSWER,
  SAVE_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_ANSWER:
      const { authedUser, qid, answer } = action;
      let selectedOption = {};
      if (answer === "optionOne") {
        selectedOption = {
          optionOne: {
            ...state[qid].optionOne,
            votes: state[qid].optionOne.votes.concat([authedUser]),
          },
        };
      } else {
        selectedOption = {
          optionTwo: {
            ...state[qid].optionTwo,
            votes: state[qid].optionTwo.votes.concat([authedUser]),
          },
        };
      }
      return {
        ...state,
        [qid]: {
          ...state[qid],
          ...selectedOption,
        },
      };

    case SAVE_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
