import { AuthenticationReducerState } from "@reducers/authentication";
import { MatchReducerState } from "@reducers/match";
import { TeamReducerState } from "@reducers/team";
export interface IStore {
  readonly matches: MatchReducerState;
  readonly authentication: AuthenticationReducerState;
  readonly teams: TeamReducerState;
}
