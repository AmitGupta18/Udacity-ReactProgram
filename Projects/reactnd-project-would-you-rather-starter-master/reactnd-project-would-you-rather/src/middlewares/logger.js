const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("The Action", action);
  const nextVal = next(action);
  console.log("New state: ", store.getState());
  console.groupEnd();
  return nextVal;
};

export default logger;
