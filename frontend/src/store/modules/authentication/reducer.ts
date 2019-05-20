import { AUTH_LOGIN_SUCCESS, AUTH_lOGIN_ERROR, AUTH_REGISTER_START, AUTH_REGISTER_ERROR, AUTH_REGISTER_SUCCESS, AUTH_LOGOUT_SUCCESS, AUTH_INFO_SUCCESS, AUTH_INFO_START, AUTH_INFO_ERROR } from "./constants";
import { AuthenticationReducerState } from "./state";
import { IAction } from "src/store/action";
import { Reducer } from "redux";

const defaultState: AuthenticationReducerState = {
    isLoading: false,
    isRoleLoading: false
};

export const authenticationReducer: Reducer<AuthenticationReducerState, IAction<AuthenticationReducerState>> = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                error: false,
                isLoggedIn: true,
            };
        case AUTH_lOGIN_ERROR:
            return {
                ...state,
                ...action.payload,
                isLoggedIn: false,
                isLoading: false,
                token: undefined
            };
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                error: false,
                isLoggedIn: true
            };
        case AUTH_REGISTER_ERROR:
            return {
                ...state,
                error: action.error,
                ...action.payload,
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
                name: undefined,
                role: undefined,
                email: undefined
            };
        case AUTH_INFO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isRoleLoading: false
            }
        case AUTH_INFO_START:
            return {
                ...state,
                isRoleLoading: true
            }
        case AUTH_INFO_ERROR:
            return {
                ...state,
                isRoleLoading: false,
                role: ""
            }
        default:
            return state;
    }
};