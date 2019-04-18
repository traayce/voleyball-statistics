import { AxiosInstance } from "axios";
import { ThunkAction as ReduxThunkAction } from "redux-thunk";
import { IStore } from "./state";

export type ThunkAction = ReduxThunkAction<any, IStore, AxiosInstance, any>;

export interface IAction<T, M = any> {
  readonly type: string;
  readonly payload?: T;
  readonly error?: boolean;
  readonly meta?: M;
}

export type ActionCreator<T, M = any> = (
  payload?: T,
  error?: boolean,
  meta?: M
) => IAction<T, M>;

export function createAction<T, M = any> (type: string): ActionCreator<T, M> {
  return (payload?: T, error?: boolean, meta?: M) => ({
    type,
    payload,
    error,
    meta
  });
}
