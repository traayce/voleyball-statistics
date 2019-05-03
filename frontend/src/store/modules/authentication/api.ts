import axios from "axios";
import { RegistrationModel } from "src/types";
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

    export const getInfo = (token: string) => {
        return request
            .get(``, {
                headers: {
                    "Authorization": `Bearer: ${token}`
                }
            })
            .then(res => res.data)
            .catch(err => err);
    };
}
