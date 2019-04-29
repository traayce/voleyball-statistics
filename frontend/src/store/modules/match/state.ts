import { MatchModel } from "src/types";

export interface MatchReducerState {
    matchesList: Array<MatchModel>;
    isLoading: boolean;
    isLoaded: boolean;
    error?: string;
}