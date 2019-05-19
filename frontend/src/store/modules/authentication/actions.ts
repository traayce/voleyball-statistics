import { AUTH_LOGIN_START, AUTH_LOGIN_SUCCESS, AUTH_lOGIN_ERROR, AUTH_REGISTER_START, AUTH_REGISTER_ERROR, AUTH_REGISTER_SUCCESS, AUTH_LOGOUT_SUCCESS, AUTH_INFO_SUCCESS, AUTH_INFO_START, AUTH_INFO_ERROR } from "./constants";
import { authenticationCommands } from "./api";
import { ThunkDispatch } from "redux-thunk";
import { AuthenticationReducerState } from "./state";
import { Action } from "redux";
import { IAction, ResolveAxiosError } from "../../action";
import { AxiosResponse, AxiosError } from "axios";
import { ProblemDetails, RegistrationModel } from "src/types";

type dispatchType = ThunkDispatch<AuthenticationReducerState, void, Action>;

function isAxiosReponse(item: AxiosResponse<ProblemDetails>): item is AxiosResponse<ProblemDetails> {
    return (<ProblemDetails>item.data) !== undefined;
}

export namespace authenticationReducerActions {
    export const authenticate = (email: string, password: string) => async (
        dispatch: dispatchType,
    ) => {
        dispatch(authenticateStart());
        try {
            const response = await authenticationCommands.authenticate(email, password);
            dispatch(authenticateSuccess(response._id, response.login, response.token));
            dispatch(getInfo());
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response == null) return;
                if (isAxiosReponse(e.response)) {
                    dispatch(authenticateFail(ResolveAxiosError(e)));
                }
            }
        }
    };

    export const getInfo = () => (
        dispatch: dispatchType,
    ) => {
        dispatch({
            type: AUTH_INFO_START
        });
        authenticationCommands
            .getInfo()
            .then(res => {
                dispatch({
                    type: AUTH_INFO_SUCCESS,
                    payload: {
                        ...res
                    }
                })
            })
            .catch(err => dispatch({
                type: AUTH_INFO_ERROR
            }));
    };

    function isAxiosError(instance: AxiosError): instance is AxiosError {
        return (<AxiosError>instance) !== undefined;
    }
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

    const authenticateFail = (err: string): IAction<AuthenticationReducerState> => ({
        type: AUTH_lOGIN_ERROR,
        error: true,
        payload: {
            errorMessage: err
        }
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

    export const logoutSuccess = (): IAction<AuthenticationReducerState> => ({
        type: AUTH_LOGOUT_SUCCESS
    });
}