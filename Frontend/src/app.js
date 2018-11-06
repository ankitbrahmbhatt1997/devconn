import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { setCurrentUser } from "./actions/authAction";
import setAuthToken from "./utils/setAuthToken";
import jwtDecode from "jwt-decode";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();
if (localStorage.jwtToken) {
  let token = localStorage.jwtToken;

  setAuthToken(token);
  const decoded = jwtDecode(token);

  store.dispatch(setCurrentUser(decoded));
}
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
