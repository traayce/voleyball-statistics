import axios from "axios";
import { RegistrationModel, UserInfoModel } from "src/types";
import { GetRequestHeader } from "@utils/header";
const baseURL: string = "http://localhost:3000/api";
const request = axios.create({
    baseURL: baseURL + "/authentication",
    headers: {
        Accept: "application/json"
    }
});

export namespace authenticationCommands {
    export const authenticate = (email: string, password: string) => {
        return request
            .post("", { name: email, password })
            .then(res => res.data);
    };

    export const register = (model: RegistrationModel) => {
        return request
            .put("", { ...model })
            .then(res => res.data);
    };

    export const getInfo = () => {
        return request
            .get<UserInfoModel>(``, {
                headers: {
                    Accept: "application/json",
                    ...GetRequestHeader().headers
                }
            })
            .then(res => res.data);
    };
}
