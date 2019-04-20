
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export type ThunkAction<T> = ThunkDispatch<T, void, Action>;

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
