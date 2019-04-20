import * as React from "react";
import { AuthenticationContainerStyles } from "./components-products-styles";
import { WithStyles, Paper, withStyles } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { LoginComponent } from "./components-login-component";

class AuthenticationContainerClass extends React.PureComponent<WithStyles<typeof AuthenticationContainerStyles>> {
    public render(): JSX.Element {
        const { classes } = this.props;
        return <Paper className={classes.Container}>
            <LoginComponent />
        </Paper>;
    }
}
export const AuthenticationContainer = hot(withStyles(AuthenticationContainerStyles)(AuthenticationContainerClass));