import { TeamModel } from "src/types";

export interface TeamReducerState {
    teams: Array<TeamModel>;
    isLoading: boolean;
    isLoaded: boolean;
    error?: string;
}