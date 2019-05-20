import { AxiosResponse } from "axios";
import { request } from "../base";
import { MatchPointModel, MatchPointCreateModel } from "src/types";

export namespace matchPointApiCommands {
    export const get = (ids: string[]): Promise<AxiosResponse<MatchPointModel[]>> => {
        return request
            .get<MatchPointModel[]>(`/matches/MatchPoints`,
                {
                    params: {
                        ids
                    }
                })
            .then(res => res)
            .catch(err => err);
    };

    export const post = (model: MatchPointCreateModel): Promise<AxiosResponse<MatchPointModel>> => {
        return request
            .post<MatchPointModel>(`/matches/MatchPoints`, model)
            .then(res => res);
    };

    export const deletePoint = (id: number) => {
        return request
            .delete(`/matches/MatchPoints/${id}`)
            .then(res => res.data);
    };
}