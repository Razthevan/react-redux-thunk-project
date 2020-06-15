import thunk from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";

import rootReducer, { initialState } from "./rootReducer";

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
