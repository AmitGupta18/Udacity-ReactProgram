//
// Reducers
//
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goals]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

//
// Store
//
function createStore(reducer) {
  let state;
  let listeners = [];

  /*
   * Get state method
   */
  const getState = () => state;

  /*
   * Subscribe method
   */
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  /*
   * Dispatch method
   */
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

//
// Generate random ids
//
function generateId() {
  Math.random();
}

//
// Constants
//
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

//
// Action Creators
//
const addTodo = (todo) => ({
  type: ADD_TODO,
  todo: todo,
});

const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id: id,
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id: id,
});

const addGoal = (goal) => ({
  type: ADD_GOAL,
  goal: goal,
});

const removeGoal = (id) => ({
  type: REMOVE_GOAL,
  id: id,
});

//
// Create store with reducers
//
const store = createStore(app);

//
// Subscribe/Unsubscribe to the store
//
store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed: ", store.getState());
});

// Unsubscribe
unsubscribe();

store.dispatch(
  addTodo({
    id: 0,
    name: "Learn Redux",
    complete: false,
  })
);
