import { combineReducers } from "redux";
import { IStore } from "./state";
import { authenticationReducer } from "@reducers/authentication";
import { productsReducer } from "@reducers/product";

export const reducer = combineReducers<IStore>({
  authentication: authenticationReducer,
  products: productsReducer
});
