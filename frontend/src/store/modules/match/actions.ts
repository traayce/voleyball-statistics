import { MATCH_LIST_FETCH_SUCCESS, MATCH_LIST_FETCH_START, MATCH_LIST_FETCH_ERROR, MATCH_LIST_FETCH_INVALIDATE, MATCH_LIST_UPDATE_POINTS_SUMMARY } from "./constants";
import { matchCommands } from "./api";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { MatchReducerState } from "./state";
import { IAction } from "@store/action";
import { MatchModel, MatchPointsSummaryModel } from "src/types";

export const getMatches = (ids: string[] = []) => {
    return async (dispatch: ThunkDispatch<MatchReducerState, void, Action>) => {
        dispatch(getMatchesStart());
        try {
            const response = await matchCommands.get(ids);
            dispatch(getMatchesSuccess(response.data));
        }
        catch (e) {
            dispatch(getMatchesFail("error occured while gettind matches list"));
        }
    };
};

// export const refreshPointSummary = (ids: string[] = []) => {
//     return async (dispatch: ThunkDispatch<MatchReducerState, void, Action>) => {
//         dispatch(getMatchesStart());
//         try {
//             const response = await matchCommands.get(ids);
//             dispatch(getMatchesSuccess(response.data));
//         }
//         catch (e) {
//             dispatch(getMatchesFail("error occured while gettind matches list"));
//         }
//     };
// };

export const refreshPointSummary = (matchId: number, model: MatchPointsSummaryModel): IAction<MatchReducerState> => {
    return ({
        type: MATCH_LIST_UPDATE_POINTS_SUMMARY,
        payload: {
            id: matchId,
            model,
            isLoading: false
        }
    });
};


export const refreshPointSummaryIsLoading = (matchId: number, model: MatchPointsSummaryModel): IAction<MatchReducerState> => {
    return ({
        type: MATCH_LIST_LOADING
    });
};

export const invalidateData = (): IAction<MatchReducerState> => {
    return ({
        type: MATCH_LIST_FETCH_INVALIDATE
    });
};

const getMatchesSuccess = (res: Array<MatchModel>): IAction<MatchReducerState> => {
    return ({
        type: MATCH_LIST_FETCH_SUCCESS,
        payload: {
            matchesList: res
        }
    });
};

const getMatchesFail = (error: string): IAction<MatchReducerState> => {
    return ({
        type: MATCH_LIST_FETCH_ERROR,
        payload: {
            error
        }
    });
};

const getMatchesStart = (): IAction<MatchReducerState> => ({
    type: MATCH_LIST_FETCH_START
});

export const deleteMatch = (id: number) => {
    return async () => {
        matchCommands.deleteMatch(id);
    };
};