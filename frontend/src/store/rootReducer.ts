import { combineReducers } from "redux";
import { productsReducer } from "./modules/product";
import { IStore } from "./state";

export const reducer = combineReducers<IStore>({
  products: productsReducer
});
