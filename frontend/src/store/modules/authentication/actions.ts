import { createAction, ThunkAction } from "client/store/action";
import { AUTH_LOGIN_START, AUTH_LOGIN_SUCCESS, AUTH_lOGIN_ERROR, AUTH_REGISTER_START, AUTH_REGISTER_ERROR, AUTH_REGISTER_SUCCESS, AUTH_LOGOUT_SUCCESS } from "./constants";
import { authenticationCommands } from "./api";
import { IRegisterModel } from "client/helpers/registration";
import { ThunkDispatch } from "redux-thunk";
import { AuthenticationReducerState } from "./state";
import { Action } from "redux";

type dispatchType = ThunkDispatch<AuthenticationReducerState, void, Action>;

export const authenticate = (email: string, password: string): ThunkAction => (
    dispatch: dispatchType,
) => {
    authenticationCommands
        .authenticate(email, password)
        .then((res) => dispatch(authenticateSuccess(res._id, res.login, res.token)))
        .catch((err: any) => dispatch(authenticateFail(err.response)));
};

const authenticateStart = () => ({
    type: AUTH_LOGIN_START
});

const authenticateSuccess = (id: string, name: string, token: string) => ({
    type: AUTH_LOGIN_SUCCESS,
    id,
    name,
    token
});

const authenticateFail = (err) => ({
    type: AUTH_lOGIN_ERROR,
    error: err.data
});

// register
export const register = (model: IRegisterModel): ThunkAction => (
    dispatch: dispatchType,
) => {
    authenticationCommands
        .register(model)
        .then(res => dispatch(res.success ? registerteSuccess(res.id, res.name, res.token) : registerFail(res)))
        .catch(err => dispatch(registerFail(err)));
};

interface ReduxAction<T> {
    type: string;
    payload?: Partial<T>;
}

const registerStart = (): ReduxAction<AuthenticationReducerState> => ({
    type: AUTH_REGISTER_START
});

const registerteSuccess = (id: number, name: string, token: string): ReduxAction<AuthenticationReducerState> => ({
    type: AUTH_REGISTER_SUCCESS,
    payload: {
        id,
        name,
        token
    }
});

const registerFail = (err: string) => ({
    type: AUTH_REGISTER_ERROR,
    error: err
});

export const logout = (token: any): ThunkAction => (
    dispatch: dispatchType
) => {
    authenticationCommands.logout(token);
    dispatch(logoutSuccess());
};

const logoutSuccess = () => ({
    type: AUTH_LOGOUT_SUCCESS
});