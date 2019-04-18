import { captureException } from "raven-js";
import { Middleware } from "redux";

export const crashReporting: Middleware = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    });

    throw err;
  }
};
