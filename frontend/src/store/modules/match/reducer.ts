import { MATCH_LIST_FETCH_SUCCESS, MATCH_LIST_FETCH_ERROR, MATCH_LIST_FETCH_START, MATCH_LIST_FETCH_INVALIDATE, MATCH_LIST_UPDATE_POINTS_SUMMARY, MATCH_ACTION_START } from "./constants";
import { MatchReducerState } from "./state";
import { IAction } from "src/store/action";
import { Reducer } from "redux";

const defaultState: MatchReducerState = {
    isLoading: false,
    isLoaded: false,
    matchesList: [],
    error: undefined
};

export const matchesReducer: Reducer<MatchReducerState, IAction<MatchReducerState>> = (state = defaultState, action) => {
    switch (action.type) {
        case MATCH_LIST_FETCH_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                error: "",
                isLoaded: true
            };
        case MATCH_LIST_FETCH_ERROR:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                matchesList: [],
                isLoaded: true
            };
        case MATCH_LIST_FETCH_START:
            return {
                ...state,
                isLoading: true,
                error: undefined,
                isLoaded: false
            };
        case MATCH_LIST_FETCH_INVALIDATE:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                error: undefined
            };
        case MATCH_LIST_UPDATE_POINTS_SUMMARY:
            const { id, model } = action.payload;
            const matches = state.matchesList.map(x => {
                if (x.id === id) {
                    x.pointsSummary = model;
                }
                return x;
            });
            return {
                ...state,
                error: undefined,
                matchesList: matches,
                isLoading: false
            };
        case MATCH_ACTION_START:
            return {
                ...state,
                isLoading: true,
                error: undefined
            };
        default:
            return state;
    }
};