import { AxiosResponse } from "axios";
import { request } from "../base";
import {
    PlayerPointModel, PlayerPointCreateModel
} from "src/types";

export namespace playerPointApiCommands {
    export const get = (ids: string[]): Promise<AxiosResponse<PlayerPointModel[]>> => {
        return request
            .get<PlayerPointModel[]>(`/matches/PlayerPoints`,
                {
                    params: {
                        ids
                    }
                })
            .then(res => res)
            .catch(err => err);
    };

    export const post = (model: PlayerPointCreateModel): Promise<AxiosResponse<PlayerPointModel>> => {
        return request
            .post<PlayerPointModel>(`/matches/PlayerPoints`, model)
            .then(res => res);
    };

    export const deletePoint = (id: number) => {
        return request
            .delete(`/matches/PlayerPoints/${id}`)
            .then(res => res.data);
    };
}