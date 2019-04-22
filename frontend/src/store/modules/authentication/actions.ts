import { AUTH_LOGIN_START, AUTH_LOGIN_SUCCESS, AUTH_lOGIN_ERROR, AUTH_REGISTER_START, AUTH_REGISTER_ERROR, AUTH_REGISTER_SUCCESS, AUTH_LOGOUT_SUCCESS } from "./constants";
import { authenticationCommands } from "./api";
import { ThunkDispatch } from "redux-thunk";
import { AuthenticationReducerState } from "./state";
import { Action } from "redux";
import { IAction } from "../../action";

type dispatchType = ThunkDispatch<AuthenticationReducerState, void, Action>;

export const authenticate = (email: string, password: string) => (
    dispatch: dispatchType,
) => {
    dispatch(authenticateStart());
    authenticationCommands
        .authenticate(email, password)
        .then((res) => dispatch(authenticateSuccess(res._id, res.login, res.token)))
        .catch((err: any) => dispatch(authenticateFail(err.response)));
};

const authenticateStart = (): IAction<AuthenticationReducerState> => ({
    type: AUTH_LOGIN_START
});

const authenticateSuccess = (id: number, name: string, token: string): IAction<AuthenticationReducerState> => ({
    type: AUTH_LOGIN_SUCCESS,
    payload: {
        id,
        name,
        token
    }
});

const authenticateFail = (err: string) => ({
    type: AUTH_lOGIN_ERROR,
    error: err
});

// register
export const register = (model: RegistrationModel) => (
    dispatch: dispatchType,
) => {
    dispatch(registerStart());
    authenticationCommands
        .register(model)
        .then(res => dispatch(res.success ? registerteSuccess(res.id, res.name, res.token) : registerFail(res)))
        .catch(err => dispatch(registerFail(err)));
};

const registerStart = (): IAction<AuthenticationReducerState> => ({
    type: AUTH_REGISTER_START
});

const registerteSuccess = (id: number, name: string, token: string): IAction<AuthenticationReducerState> => ({
    type: AUTH_REGISTER_SUCCESS,
    payload: {
        id,
        name,
        token
    }
});

const registerFail = (err: string): IAction<AuthenticationReducerState> => ({
    type: AUTH_REGISTER_ERROR,
    error: true,
    payload: {
        errorMessage: err
    }
});

export const logout = (token: any) => (
    dispatch: dispatchType
) => {
    authenticationCommands.logout(token);
    dispatch(logoutSuccess());
};

const logoutSuccess = (): IAction<AuthenticationReducerState> => ({
    type: AUTH_LOGOUT_SUCCESS
});