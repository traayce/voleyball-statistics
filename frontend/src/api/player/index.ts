import { AxiosResponse } from "axios";
import { request } from "../base";
import { PlayerModel, PlayerCreateModel } from "src/types";
import { transformRequestOptions } from "@utils/serializer";

export namespace playerApiCommands {
    export const get = (ids: string[]): Promise<AxiosResponse<PlayerModel[]>> => {
        return request
            .get<PlayerModel[]>(`/players`,
                {
                    params: {
                        matchIds: ids
                    }
                })
            .then(res => res)
            .catch(err => err);
    };

    export const patch = (playerId: number, model: Partial<PlayerCreateModel>): Promise<AxiosResponse<PlayerModel>> => {
        const body = Object.keys(model).map(key => ({
            path: `/${key}`,
            op: "replace",
            value: model[key as keyof PlayerCreateModel]
        }));

        return request
            .patch<PlayerModel>(`/players/${playerId}`, body)
            .then(res => res)
            .catch(err => err);
    };

    export const post = (model: PlayerCreateModel): Promise<AxiosResponse<PlayerModel>> => {
        return request
            .post<PlayerModel>(`/players`, model)
            .then(res => res);
    };

    export const deletePlayers = (ids: number[]) => {
        return request
            .delete(`/players`,
                {
                    params: {
                        playerIds: ids.map(x => x.toString())
                    },
                    paramsSerializer: (params) => transformRequestOptions(params)
                })
            .then(res => res.data);
    };
}