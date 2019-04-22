import { AUTH_LOGIN_SUCCESS, AUTH_lOGIN_ERROR, AUTH_REGISTER_START, AUTH_REGISTER_ERROR, AUTH_REGISTER_SUCCESS, AUTH_LOGOUT_SUCCESS } from "./constants";
import { AuthenticationReducerState } from "./state";
import { IAction } from "src/store/action";
import { Reducer } from "redux";

const defaultState: AuthenticationReducerState = {
    token: undefined,
    id: undefined,
    name: undefined,
    isLoading: false
};

export const authenticationReducer: Reducer<AuthenticationReducerState, IAction<AuthenticationReducerState>> = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                error: undefined
            };
        case AUTH_lOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
                token: undefined,
                error: action.error
            };
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: undefined,
                ...action
            };
        case AUTH_REGISTER_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case AUTH_REGISTER_START:
            return {
                ...state,
                isLoading: true
            };
        case AUTH_LOGOUT_SUCCESS:
            return {
                ...state,
                id: undefined,
                token: undefined,
                name: undefined
            };
        default:
            return state;
    }
};