import { AxiosResponse } from "axios";
import { request } from "../base";
import { MatchModel, MatchCreateModel, MatchStatisticsModel } from "src/types";

export namespace matchApiCommands {
    export const get = (ids: string[]): Promise<AxiosResponse<MatchModel[]>> => {
        return request
            .get<MatchModel[]>(`/matches`,
                {
                    params: {
                        matchIds: ids
                    }
                })
            .then(res => res)
            .catch(err => err);
    };

    export const getStatistics = (id: number): Promise<AxiosResponse<MatchStatisticsModel>> => request
        .get<MatchModel[]>(`/matches/${id}/statistics`)
        .then(res => res)
        .catch(err => err);

    export const patch = (matchId: number, model: Partial<MatchCreateModel>): Promise<AxiosResponse<MatchModel>> => {
        const body = Object.keys(model).map(key => ({
            path: `/${key}`,
            op: "replace",
            value: model[key as keyof MatchCreateModel]
        }));
        return request
            .patch<MatchModel>(`/matches/${matchId}`, body)
            .then(res => res)
            .catch(err => err);
    };

    export const post = (model: MatchCreateModel): Promise<AxiosResponse<MatchModel>> => {
        return request
            .post<MatchModel>(`/matches`, model)
            .then(res => res)
            .catch(err => err);
    };

    export const deleteMatch = (id: number) => {
        return request
            .delete(`/matches/${id}`)
            .then(res => res.data);
    };
}