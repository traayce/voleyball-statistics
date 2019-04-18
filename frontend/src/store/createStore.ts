import { Store, compose, applyMiddleware, createStore } from "redux";
import { middleware } from "./middleware";
import { reducer } from "./rootReducer";
import { IStore } from "./state";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export const storeCreator = (initialState?: IStore): Store<IStore | {}> => {
  let storeMiddleware = applyMiddleware(...middleware);
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  if (devTools != null) {
    storeMiddleware = compose(storeMiddleware, devTools);
  }
  return createStore(reducer, storeMiddleware);
};
