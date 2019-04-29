import { AuthenticationReducerState } from "@reducers/authentication";
import { MatchReducerState } from "@reducers/match";
export interface IStore {
  readonly matches: MatchReducerState;
  readonly authentication: AuthenticationReducerState;
}
