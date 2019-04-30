import { AxiosResponse } from "axios";
import { request } from "../base";
import { MatchPlayerModel, MatchPlayerCreateModel } from "src/types";

export namespace matchPlayerCommands {
    export const get = (ids: string[]): Promise<AxiosResponse<MatchPlayerModel[]>> => {
        return request
            .get<MatchPlayerModel[]>(`/matches/MatchPlayers`,
                {
                    params: {
                        playerIds: ids
                    }
                })
            .then(res => res)
            .catch(err => err);
    };

    export const post = (model: MatchPlayerCreateModel): Promise<AxiosResponse<MatchPlayerModel>> => {
        return request
            .post<MatchPlayerModel>(`/matches/MatchPlayers`, model)
            .then(res => res)
            .catch(err => err);
    };

    export const deleteMatch = (id: number) => {
        return request
            .delete(`/matches/MatchPlayers/${id}`)
            .then(res => res.data);
    };
}