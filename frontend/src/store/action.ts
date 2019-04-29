
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { AxiosError, AxiosResponse } from "axios";
import { ProblemDetails } from "src/types";

export type ThunkAction<T> = ThunkDispatch<T, void, Action>;

export interface IAction<T, M = any> {
  readonly type: string;
  readonly payload?: Partial<T>;
  readonly error?: boolean;
  readonly meta?: M;
}

export type ActionCreator<T, M = any> = (
  payload?: T,
  error?: boolean,
  meta?: M
) => IAction<T, M>;


function isAxiosError(instance: AxiosError): instance is AxiosError {
  return (<AxiosError>instance) !== undefined;
}

function isAxiosReponse(item: AxiosResponse<ProblemDetails>): item is AxiosResponse<ProblemDetails> {
  return (<ProblemDetails>item.data) !== undefined;
}

export const errorMessage = "Sistemos klaida. Pabandykite vėliau";
export function ResolveAxiosError(e: any): string {
  if (isAxiosError(e)) {
    if (e.response == null) return errorMessage;
    if (isAxiosReponse(e.response)) {
      return e.response.data.Errors[""][0];
    }
  }
  return errorMessage;
}