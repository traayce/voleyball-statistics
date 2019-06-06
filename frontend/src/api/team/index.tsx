import { AxiosResponse } from "axios";
import { request } from "../base";
import { TeamModel, TeamCreateModel } from "src/types";
import { transformRequestOptions } from "@utils/serializer";

export namespace teamApiCommands {
    export const get = (ids: string[]): Promise<AxiosResponse<TeamModel[]>> => {
        return request
            .get<TeamModel[]>(`/teams`,
                {
                    params: {
                        teamIds: ids
                    }
                })
            .then(res => res)
            .catch(err => err);
    };

    export const patch = (teamId: number, model: Partial<TeamCreateModel>): Promise<AxiosResponse<TeamModel>> => {
        const body = Object.keys(model).map(key => ({
            path: `/${key}`,
            op: "replace",
            value: model[key as keyof TeamCreateModel]
        }));
        return request
            .patch<TeamModel>(`/teams/${teamId}`, body)
            .then(res => res)
            .catch(err => err);
    };

    export const post = (model: TeamCreateModel): Promise<AxiosResponse<TeamModel>> => {
        return request
            .post<TeamModel>(`/teams`, model)
            .then(res => res)
            .catch(err => err);
    };

    export const deleteTeams = (ids: number[]) => {
        return request
            .delete(`/teams`,
                {
                    params: {
                        teamIds: ids.map(x => x.toString())
                    },
                    paramsSerializer: (params) => transformRequestOptions(params)
                })
            .then(res => res.data);
    };
}