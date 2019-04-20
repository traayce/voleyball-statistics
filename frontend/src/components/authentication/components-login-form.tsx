import { Paper, WithStyles, withStyles, Button, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
import * as React from "react";
import { Redirect } from "react-router";
import { AuthenticationContainerStyles } from "./components-products-styles";

interface OwnProps {
    onSubmit: (e: React.FormEvent<any>) => any;
    onEmailChange: React.ChangeEventHandler<HTMLInputElement>;
    onPasswordChange: React.ChangeEventHandler<HTMLInputElement>;
    onRedirect: React.MouseEventHandler<HTMLInputElement>;
    emailValue: string;
    passwordValue: string;
    error: undefined | string;
    redirect: boolean;
}

type Props = OwnProps & WithStyles<typeof AuthenticationContainerStyles>;

export const LoginComponentForm = withStyles(AuthenticationContainerStyles)(
    class FormClass extends React.Component<Props> {
        private redirectAction = (redirect: boolean) => {
            return redirect ? <Redirect to="/register" /> : null;
        }
        private renderError = (error?: string) => {
            if (error != null) {
                return (<div className="status alert alert-danger" style={{ display: "block" }} >
                    {error}
                </div>);
            }
        }
        public render() {
            const {
                emailValue,
                onEmailChange,
                onPasswordChange,
                onSubmit,
                onRedirect,
                passwordValue,
                error,
                redirect,
                classes
            } = this.props;
            return (
                <Paper className={classes.Container}>
                    {this.redirectAction(redirect)}
                    {this.renderError(error)}
                    <form onSubmit={onSubmit}>
                        <FormControl error={false}>
                            <InputLabel >El. paštas</InputLabel>
                            <Input
                                id="email"
                                value={emailValue}
                                type="number"
                                placeholder="El. paštas"
                                onChange={onEmailChange}
                                autoFocus
                                fullWidth />
                            <FormHelperText></FormHelperText>
                        </FormControl>
                        <FormControl error={false}>
                            <InputLabel >Slaptažodis</InputLabel>
                            <Input
                                id="email"
                                value={passwordValue}
                                type="number"
                                placeholder="Slaptažodis"
                                onChange={onPasswordChange}
                                fullWidth />
                            <FormHelperText></FormHelperText>
                        </FormControl>
                        <Button type="submit" variant="contained" fullWidth >
                            Prisijungti
                </Button>
                    </form>
                    <div className={classes.Center}>
                        <p>Neturite paskyros?</p>
                        <Button type="submit" variant="contained" onClick={onRedirect} >
                            Registracija
                </Button>
                    </div>
                </Paper>
            );
        }
    });