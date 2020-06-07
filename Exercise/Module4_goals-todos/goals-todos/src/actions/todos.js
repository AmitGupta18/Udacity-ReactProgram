import API from "goals-todos-api";

export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

//
// Action Creators
//
const addTodo = (todo) => ({
  type: ADD_TODO,
  todo,
});

const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id: id,
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id: id,
});

//
// Thunk Action Creators
//
export const handleAddTodo = (name, emptyTextField) => {
  return (dispatch) => {
    return API.saveTodo(name).then((todo) => {
      dispatch(addTodo(todo));
      emptyTextField();
    });
  };
};

export const handleDeleteTodo = (todo) => {
  return (dispatch) => {
    dispatch(removeTodo(todo.id));

    return API.deleteTodo(todo.id).catch(() => {
      dispatch(addTodo(todo));
      alert("An error occurred. Try Again!!");
    });
  };
};

export const handleToggleTodo = (id) => {
  return (dispatch) => {
    dispatch(toggleTodo(id));

    return API.saveTodoToggle(id).catch(() => {
      dispatch(toggleTodo(id));
      alert("An error occurred. Try Again!!");
    });
  };
};
