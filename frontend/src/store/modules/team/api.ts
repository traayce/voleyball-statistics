import axios, { AxiosResponse } from "axios";
import { TeamModel } from "src/types";
import { GetRequestHeader } from "@utils/header";
import { transformRequestOptions } from "@utils/serializer";
const baseURL: string = "http://localhost:3000/api/teams";
const request = axios.create({
    baseURL,
    headers: {
        Accept: "application/json"
    }
});

export namespace teamCommands {
    export const get = (ids: string[]): Promise<AxiosResponse<TeamModel[]>> => {
        return request
            .get<TeamModel[]>(``, {
                ...GetRequestHeader(),
                params: { matchIds: ids },
                paramsSerializer: (params) => transformRequestOptions(params)
            })
            .then(res => res)
            .catch(err => err);
    };
    export const deleteTeam = (id: number) => {
        return request
            .delete(`/${id}`)
            .then(res => res.data);
    };
}

