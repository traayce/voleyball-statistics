import * as React from "react";
import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { authenticationReducerActions } from "@reducers/authentication";
import { Redirect } from "react-router";
import { IStore } from "src/store/state";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { Formik, FormikProps, Form, FormikConfig } from "formik";
import { UserCreateModel } from "src/types";
import { InputField } from "@components/inputs/textfield-component";
import { Button, WithStyles, withStyles } from "@material-ui/core";
import { userApiCommands } from "@api/user";
import { ResolveAxiosError } from "@utils/header";
import { createStyles, Theme } from "@material-ui/core/styles";

export const styles = (theme: Theme) => createStyles({
  Button: {
    marginBottom: theme.spacing.unit * 2
  }
});
interface StateProps {
  isLoading?: boolean;
  isLoggedIn: boolean;
}

interface DispatchProps {
  authenticate: (email: string, password: string) => any;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;
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
      render={(formikBag: FormikProps<TempModel>) => (
        <Form>
          <InputField<keyof TempModel>
            type="text"
            name="email"
            label="El. Paštas"
            fullWidth={true}
            validate={this.validate}
            className={classes.Button}
          />
          <InputField<keyof TempModel>
            type="text"
            name="name"
            label="Vardas Pavardė"
            fullWidth={true}
            validate={this.validate}
            className={classes.Button}
          />
          <InputField<keyof TempModel>
            type="password"
            name="password"
            label="Slaptažodis"
            validate={this.validate}
            fullWidth={true}
            className={classes.Button}
          />
          <InputField<keyof TempModel>
            type="password"
            name="repeatPassword"
            label="Pakartokite slaptažodį"
            fullWidth={true}
            validate={this.validate}
            className={classes.Button}
          />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={formikBag.isSubmitting || Boolean(formikBag.error)} >Registruotis</Button>
        </ Form>
      )}
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
  private onSubmit: FormikConfig<UserCreateModel>["onSubmit"] = async (values) => {
    debugger;
    try {
      const response = await userApiCommands.post(values);
      // if (response.response.status === 400) {
      //   const errors = ResolveAxiosError(response);
      //   console.log(errors);
      // }
    }
    catch (e) {
      const errors = ResolveAxiosError(e);
    }
    return;
  }

}

export const ScenesRegistrationComponent = withStyles(styles)(connect(RegistrationComponentClass.MapStateToProps, RegistrationComponentClass.MapDispatchToProps)(RegistrationComponentClass));