import { combineReducers } from "redux";
import { IStore } from "./state";
import { authenticationReducer } from "@reducers/authentication";
import { matchesReducer } from "@reducers/match";
import { teamsReducer } from "@reducers/team";

export const reducer = combineReducers<IStore>({
  authentication: authenticationReducer,
  matches: matchesReducer,
  teams: teamsReducer
});
