import axios, { AxiosResponse } from "axios";
import { MatchModel } from "src/types";
import { GetRequestHeader } from "@utils/header";
import { transformRequestOptions } from "@utils/serializer";
const baseURL: string = "http://localhost:3000/api/matches";
const request = axios.create({
    baseURL,
    headers: {
        Accept: "application/json"
    }
});

export namespace matchCommands {
    export const get = (ids: string[]): Promise<AxiosResponse<MatchModel[]>> => {
        return request
            .get<MatchModel[]>(``, {
                ...GetRequestHeader(),
                params: { matchIds: ids },
                paramsSerializer: (params) => transformRequestOptions(params)
            })
            .then(res => res)
            .catch(err => err);
    };

    export const deleteMatch = (id: number) => {
        return request
            .delete(`/${id}`)
            .then(res => res.data);
    };
}

