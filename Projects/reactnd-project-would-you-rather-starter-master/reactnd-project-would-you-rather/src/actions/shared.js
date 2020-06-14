import { showLoading, hideLoading } from "react-redux-loading";
import { _getUsers, _getQuestions } from "../utils/_DATA";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());

    Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));

      dispatch(hideLoading());
    });
  };
};
