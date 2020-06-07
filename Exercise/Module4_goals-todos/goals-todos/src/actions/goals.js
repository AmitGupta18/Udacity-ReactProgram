import API from "goals-todos-api";

export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";

const addGoal = (goal) => ({
  type: ADD_GOAL,
  goal,
});

const removeGoal = (id) => ({
  type: REMOVE_GOAL,
  id: id,
});

//
// Thunk Action Creators
//
export const handleAddGoal = (name, emptyTextField) => {
  return (dispatch) => {
    API.saveGoal(name).then((goal) => {
      dispatch(addGoal(goal));
      emptyTextField();
    });
  };
};

export const handleDeleteGoal = (goal) => {
  return (dispatch) => {
    dispatch(removeGoal(goal.id));

    API.deleteGoal(goal.id).catch(() => {
      dispatch(addGoal(goal));
      alert("An error occurred. Try Again!!");
    });
  };
};
