
import { IStore } from "src/store/state";
import { ApplicationStore } from "@store/createStore";
export const GetRequestHeader = () => {
    const { authentication } = ApplicationStore.getState() as IStore;
    return ({
        headers: {
            "Authorization": `Bearer ${authentication.token}`
        }
    });
};