import API from "goals-todos-api";

export const RECEIVE_DATA = "RECEIVE_DATA";

const receiveData = (todos, goals) => ({
  type: RECEIVE_DATA,
  todos,
  goals,
});

//
// Thunk Action Creators
//
export const handleInitData = () => {
  return (dispatch) => {
    return Promise.all([API.fetchGoals(), API.fetchTodos()]).then(
      ([goals, todos]) => {
        dispatch(receiveData(todos, goals));
      }
    );
  };
};
