import { createStore } from "redux";

const createIncrementAction = ({ incrementBy = 1 } = {}) => {
  return {
    type: "INCREMENT",
    incrementBy
  };
};

// Defining The Reducer which define what to do when a particular action happens
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      if (action.incrementBy) {
        return {
          count: state.count + action.incrementBy
        };
      } else {
        return {
          count: state.count + 1
        };
      }

    case "DECREMENT":
      return {
        count: state.count - 1
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
};

//creating a store which stores the state and passing the Reducer as an argument
const store = createStore(countReducer);

// Subscribing to store for watching over any action dispatched and also calls the function in the argument everytime
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

//Dispatching particular action defined previously for the state change
store.dispatch(createIncrementAction({ incrementBy: 5 }));

store.dispatch(createIncrementAction());

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "RESET"
});
