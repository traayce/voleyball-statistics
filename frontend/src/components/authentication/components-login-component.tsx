import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { authenticationReducerActions } from "@reducers/authentication";
import { LoginComponentForm } from "./components-login-form";
import { Redirect } from "react-router";
import { IStore } from "src/store/state";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
interface StateProps {
  isLoading?: boolean;
  isLoggedIn: boolean;
  error: undefined | string;
}

interface DispatchProps {
  authenticate: (email: string, password: string) => any;
}

type Props = StateProps & DispatchProps;

interface IState {
  password: any;
  name: any;
  redirect: boolean;
  error: any;
}

class LoginComponentClass extends React.Component<Props, IState> {

  public static MapStateToProps: MapStateToProps<StateProps, {}, IStore> = ({ authentication }) => ({
    isLoggedIn: authentication.token !== undefined,
    isLoading: authentication.isLoading,
    error: authentication.errorMessage
  })

  public static MapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: ThunkDispatch<object, void, Action>, props) => {
    return ({
      authenticate: (email, password) => dispatch(authenticationReducerActions.authenticate(email, password))
    });
  }

  public state: IState = {
    name: "",
    password: "",
    redirect: false,
    error: undefined
  };

  public render() {
    const { name, password, redirect } = this.state;
    const stateError = this.state.error;
    const { isLoggedIn, error } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/matches" />;
    }

    return (
      <LoginComponentForm
        emailValue={name}
        passwordValue={password}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onSubmit={this.handleSubmit}
        onRedirect={this.handleRedirect}
        error={stateError !== undefined ? stateError : error}
        redirect={redirect}
      />
    );
  }

  private handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  }

  private handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  }

  private handleRedirect = (e: React.MouseEvent<HTMLInputElement>) => {
    this.setState({ redirect: true });
  }

  private handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    const { name, password } = this.state;
    if (!name.length || !password.length) {
      this.setState({ error: "Pirma įrašykite prisijungimo duomenis" });
      return;
    }
    this.setState({ error: undefined });
    this.props.authenticate(name, password);
  }
}

export const LoginComponent = connect(LoginComponentClass.MapStateToProps, LoginComponentClass.MapDispatchToProps)(LoginComponentClass);