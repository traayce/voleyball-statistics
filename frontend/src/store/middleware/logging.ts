// tslint:disable:no-console
import { Middleware } from "redux";

export const logger: Middleware = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);

  const result = next(action);

  console.log("next state", store.getState());
  console.groupEnd();

  return result;
};