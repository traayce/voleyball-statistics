import axios from "axios";
const baseURL: string = "http://localhost:3000/api";
const request = axios.create({
    baseURL,
    headers: {
        Accept: "application/json"
    }
});

import { IRegisterModel } from 'client/helpers/registration'
export namespace authenticationCommands {
    export const authenticate = (email: string, password: string) => {
        return request
            .post("/auth", { email, password })
            .then(res => res.data);
    };

    export const register = (model: IRegisterModel) => {
        return request
            .put("/auth", { ...model })
            .then(res => res.data);
    };

    export const logout = (token: string) => {
        return request
            .delete("/auth", { params: { token } })
            .then(res => res.data);
    };

    export const getInfo = (token: string) => {
        return request
            .get(`/auth`, {
                headers: {
                    "x-access-token": token
                }
            })
            .then(res => res.data)
            .catch(err => err);
    };
}
