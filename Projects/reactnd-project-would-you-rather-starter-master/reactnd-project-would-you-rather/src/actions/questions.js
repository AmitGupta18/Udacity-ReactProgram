import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const SAVE_QUESTION = "SAVE_QUESTION";

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

const saveAnswer = (authedUser, qid, answer) => ({
  type: SAVE_ANSWER,
  authedUser,
  qid,
  answer,
});

const saveQuestion = (question) => ({
  type: SAVE_QUESTION,
  question,
});

export const handleSaveAnswer = (qid, answer) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading);
    _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(saveAnswer(authedUser, qid, answer));
      dispatch(hideLoading());
    });
  };
};

export const handleSaveQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((formattedQuestion) => {
      dispatch(saveQuestion(formattedQuestion));
      dispatch(hideLoading());
    });
  };
};
