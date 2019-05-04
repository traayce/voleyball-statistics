import { TEAM_LIST_FETCH_SUCCESS, TEAM_LIST_FETCH_ERROR, TEAM_LIST_FETCH_START, TEAM_LIST_FETCH_INVALIDATE } from "./constants";
import { TeamReducerState } from "./state";
import { IAction } from "src/store/action";
import { Reducer } from "redux";

const defaultState: TeamReducerState = {
    isLoading: false,
    isLoaded: false,
    teams: [],
    error: undefined
};

export const teamsReducer: Reducer<TeamReducerState, IAction<TeamReducerState>> = (state = defaultState, action) => {
    switch (action.type) {
        case TEAM_LIST_FETCH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                error: "",
                isLoaded: true
            };
        case TEAM_LIST_FETCH_ERROR:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                teamesList: [],
                isLoaded: true
            };
        case TEAM_LIST_FETCH_START:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                isLoaded: false
            };
        case TEAM_LIST_FETCH_INVALIDATE:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                error: undefined
            };
        default:
            return state;
    }
};