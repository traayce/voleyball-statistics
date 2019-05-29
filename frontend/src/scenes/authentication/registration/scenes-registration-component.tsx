import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { authenticationReducerActions } from "@reducers/authentication";
import { Redirect, withRouter, RouteComponentProps } from "react-router";
import { IStore } from "src/store/state";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { Formik, FormikProps, Form, FormikConfig } from "formik";
import { UserCreateModel } from "src/types";
import { InputField } from "@components/inputs/textfield-component";
import { Button, WithStyles, withStyles } from "@material-ui/core";
import { userApiCommands } from "@api/user";
import { ResolveAxiosError, isAxiosError } from "@utils/header";
import { createStyles, Theme } from "@material-ui/core/styles";
import { AxiosResponse, AxiosError } from "axios";

export const styles = (theme: Theme) => createStyles({
  Input: {
    marginBottom: theme.spacing.unit * 2,
  },
  Button: {
    margin: "auto"
  }
});
interface StateProps {
  isLoading?: boolean;
  isLoggedIn: boolean;
}

interface DispatchProps {
  authenticate: (email: string, password: string) => any;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles> & RouteComponentProps;
interface TempModel extends UserCreateModel {
  repeatPassword: string;
}
class RegistrationComponentClass extends React.Component<Props> {

  public static MapStateToProps: MapStateToProps<StateProps, {}, IStore> = ({ authentication }) => ({
    isLoggedIn: authentication.token !== undefined,
    isLoading: authentication.isLoading
  })

  public static MapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: ThunkDispatch<object, void, Action>) => {
    return ({
      authenticate: (email, password) => dispatch(authenticationReducerActions.authenticate(email, password))
    });
  }

  public render() {
    const { isLoggedIn, classes } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/matches" />;
    }

    return <Formik<TempModel>
      initialValues={{
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
      }}
      onSubmit={this.onSubmit}
      validate={this.formValidate}
      render={(formikBag: FormikProps<TempModel>) => {
        console.log(formikBag);
        return <Form>
          <InputField<keyof TempModel>
            type="email"
            name="email"
            label="El. Paštas"
            fullWidth={true}
            validate={this.validate}
            className={classes.Input}
          />
          <InputField<keyof TempModel>
            type="text"
            name="name"
            label="Vardas Pavardė"
            fullWidth={true}
            validate={this.validate}
            className={classes.Input}
          />
          <InputField<keyof TempModel>
            type="password"
            name="password"
            label="Slaptažodis"
            validate={this.validate}
            fullWidth={true}
            className={classes.Input}
          />
          <InputField<keyof TempModel>
            type="password"
            name="repeatPassword"
            label="Pakartokite slaptažodį"
            fullWidth={true}
            validate={this.validate}
            className={classes.Input}
          />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            className={classes.Button}
            disabled={formikBag.isSubmitting || Boolean(Object.keys(formikBag.errors).length)} >Registruotis</Button>
        </ Form>;
      }}
    >
    </Formik>;
  }

  private formValidate = (values: TempModel) => {
    if (values.repeatPassword.length && values.password !== values.repeatPassword) {
      return {
        password: "Slaptažodižiai nesutampa"
      }
    }
  }
  private validate = (value: string) => {
    let error;
    if (!value) {
      error = "Laukas yra privalomas";
    }
    return error;
  }
  private onSubmit: FormikConfig<UserCreateModel>["onSubmit"] = async (values, actions) => {
    console.log(actions);
    debugger;
    try {
      const response = await userApiCommands.post(values);
      const { history, authenticate } = this.props;
      authenticate(values.email, values.password);
      history.push("/matches");
    }
    catch (e) {
      if (isAxiosError(e)) {
        const errors = ResolveAxiosError(e);
        actions.setErrors(errors);
        actions.setSubmitting(false);
      }
    }
    return;
  }

}

export const ScenesRegistrationComponent = withStyles(styles)(withRouter(connect(RegistrationComponentClass.MapStateToProps, RegistrationComponentClass.MapDispatchToProps)(RegistrationComponentClass));