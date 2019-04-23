import { Middleware } from "redux";
import { AUTH_LOGIN_SUCCESS, AUTH_REGISTER_SUCCESS, AUTH_LOGOUT_SUCCESS } from "@reducers/authentication/constants";
import { IAction } from "../action";
import { AuthenticationReducerState } from "@reducers/authentication";

const authMiddleware: Middleware = store => next => (action: IAction<AuthenticationReducerState>) => {
    const result = next(action);
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            localStorage.setItem("auth", JSON.stringify(action.payload));
            break;
        case AUTH_REGISTER_SUCCESS:
            localStorage.setItem("auth", JSON.stringify(action.payload));
            break;
        case AUTH_LOGOUT_SUCCESS:
            localStorage.removeItem("auth");
            break;
    }

    return result;
};

export default authMiddleware;
