import { MATCH_LIST_FETCH_SUCCESS, MATCH_LIST_FETCH_ERROR, MATCH_LIST_FETCH_START } from "./constants";
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
        default:
            return state;
    }
};