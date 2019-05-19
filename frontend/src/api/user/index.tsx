import { AxiosResponse } from "axios";
import { request } from "../base";
import { UserCreateModel, UserInfoModel } from "src/types";

export namespace userApiCommands {

    export const post = (model: UserCreateModel): Promise<AxiosResponse<UserInfoModel>> => {
        return request
            .post<UserInfoModel>(`/users`, model)
            .then(res => {
                if (res.status === 400) {
                    throw res;
                }
                return res;
            })
            .catch(err => err);
    };

}