import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logInReducer from "./login";
// import posts from './posts';

const reducer = combineReducers({ logInReducer});
const store = () => {
  return createStore(reducer, composeWithDevTools());
};
export default store();