import axios, { AxiosResponse } from "axios";
import { TeamModel } from "src/types";
import { GetRequestHeader } from "@utils/header";
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
    const transformRequestOptions = (params: Array<any>) => {
        let options = "";
        for (const key in params) {
            if (typeof params[key] !== "object" && params[key]) {
                options += `${key}=${params[key]}&`;
            } else if (typeof params[key] === "object" && params[key] && params[key].length) {
                params[key].forEach((el: string) => {
                    options += `${key}=${el}&`;
                });
            }
        }
        return options ? options.slice(0, -1) : options;
    };
    export const deleteTeam = (id: number) => {
        return request
            .delete(`/${id}`)
            .then(res => res.data);
    };
}

