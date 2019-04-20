import * as React from "react";
import { authenticate } from "client/store/modules/auth/actions";
import { connect } from "react-redux";
import { IStore } from "client/store/state";
import { LoginComponentForm } from "./components-login-form";
import { Redirect } from "react-router";
interface OwnProps {
  isLoading: boolean;
  isLoggedIn: boolean;
  error: undefined | string;
}

interface DispatchProps {
  authenticate: (email: string, password: string) => any;
}

type Props = OwnProps & DispatchProps;

interface IState {
  password: any;
  name: any;
  redirect: boolean;
  error: any;
}

export class LoginComponentClass extends React.Component<Props, IState> {
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
      return (<Redirect to="/logout" />);
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

  private handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value });
  }

  private handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  private handleRedirect(e: React.MouseEvent<HTMLInputElement>) {
    this.setState({ redirect: true });
  }

  private handleSubmit(e: React.FormEvent<any>) {
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

export const LoginComponent = connect<OwnProps, DispatchProps>(
  ({ auth }: IStore) => ({
    isLoggedIn: auth.token !== undefined,
    isLoading: auth.isLoading,
    error: auth.error
  }),
  (dispatch) => ({
    authenticate: (email, password) => dispatch(authenticate(email, password))
  })
)(LoginComponentClass);