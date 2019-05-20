import { WithStyles, withStyles, Button, FormControl, InputLabel, Input, FormHelperText, Grid } from "@material-ui/core";
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
            // if (error != null) {
            //     return (<div className="status alert alert-danger" style={{ display: "block" }} >
            //         {error}
            //     </div>);
            // }
            return null;
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
                <Grid>
                    {this.redirectAction(redirect)}
                    {this.renderError(error)}
                    <form onSubmit={onSubmit}>
                        <FormControl error={Boolean(error)} fullWidth>
                            <InputLabel >El. paštas</InputLabel>
                            <Input
                                id="email"
                                value={emailValue}
                                type="email"
                                placeholder="El. paštas"
                                onChange={onEmailChange} />
                            <FormHelperText>{error}</FormHelperText>
                        </FormControl>
                        <FormControl error={false} fullWidth>
                            <InputLabel >Slaptažodis</InputLabel>
                            <Input
                                id="password"
                                value={passwordValue}
                                type="password"
                                placeholder="Slaptažodis"
                                onChange={onPasswordChange} />
                            <FormHelperText></FormHelperText>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" fullWidth >
                            Prisijungti
                </Button>
                    </form>
                    <div className={classes.Center}>
                        <p>Neturite paskyros?</p>
                        <Button type="submit" variant="contained" color="primary" onClick={onRedirect} >
                            Registracija
                </Button>
                    </div>
                </Grid>
            );
        }
    });