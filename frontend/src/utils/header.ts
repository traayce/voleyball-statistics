
import { AxiosError, AxiosResponse } from "axios";
import { ProblemDetails, SystemError } from "src/types";
export const GetRequestHeader = () => {
    // const { authentication } = ApplicationStore.getState() as IStore;

    const auth = localStorage.getItem("auth");
    let token;
    if (auth !== null) {
        const preloadedAuth = JSON.parse(auth);
        if (preloadedAuth != null) {
            token = preloadedAuth.token;
        }
    }
    return ({
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};


export function isAxiosError(instance: AxiosError): instance is AxiosError {
    return (<AxiosError>instance) !== undefined;
}

function isAxiosReponse(item: AxiosResponse<ProblemDetails>): item is AxiosResponse<ProblemDetails> {
    return (<ProblemDetails>item.data) !== undefined;
}

export function ResolveAxiosError(e: any): SystemError {
    const defualt = { generalError: ["Nenumatyta sistemos klaida."] }
    if (isAxiosError(e)) {
        if (e.response == null) return defualt;
        if (isAxiosReponse(e.response)) {
            if (e.response.data.Errors[""] != null) {
                return { generalError: [e.response.data.Errors[""][0]] };
            }
            return e.response.data.Errors;
        }
    }
    return defualt;
}