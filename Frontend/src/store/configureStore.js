import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers/index";
import thunk from "redux-thunk";

let middleware = [thunk];

export default () => {
  const store = createStore(
    reducers,
    {},
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
};
