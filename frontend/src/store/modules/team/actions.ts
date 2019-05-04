import { TEAM_LIST_FETCH_SUCCESS, TEAM_LIST_FETCH_START, TEAM_LIST_FETCH_ERROR, TEAM_LIST_FETCH_INVALIDATE } from "./constants";
import { teamCommands } from "./api";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { TeamReducerState } from "./state";
import { IAction } from "@store/action";
import { TeamModel } from "src/types";

export namespace teamReducerActions {
    export const getTeams = (ids: string[] = []) => {
        return async (dispatch: ThunkDispatch<TeamReducerState, void, Action>) => {
            dispatch(getTeamsStart());
            try {
                const response = await teamCommands.get(ids);
                dispatch(getTeamsSuccess(response.data));
            }
            catch (e) {
                console.log(e);
                dispatch(getTeamsFail("error occured while gettind teames list"));
            }
        };
    };

    export const invalidateData = (): IAction<TeamReducerState> => {
        return ({
            type: TEAM_LIST_FETCH_INVALIDATE
        });
    };

    const getTeamsSuccess = (res: Array<TeamModel>): IAction<TeamReducerState> => {
        return ({
            type: TEAM_LIST_FETCH_SUCCESS,
            payload: {
                teams: res
            }
        });
    };

    const getTeamsFail = (error: string): IAction<TeamReducerState> => {
        return ({
            type: TEAM_LIST_FETCH_ERROR,
            payload: {
                error
            }
        });
    };

    const getTeamsStart = (): IAction<TeamReducerState> => ({
        type: TEAM_LIST_FETCH_START
    });

    export const deleteTeam = (id: number) => {
        return async () => {
            teamCommands.deleteTeam(id);
        };
    };
}