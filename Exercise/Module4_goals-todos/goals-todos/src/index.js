import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { createStore } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares";

import { Provider } from "react-redux";
import ConnectedApp from "./components/App";

const store = createStore(reducers, middlewares);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
