import * as React from "react";
import { AuthenticationContainerStyles } from "./components-products-styles";
import { WithStyles, Paper, withStyles } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { LoginComponent } from "./components-login-component";
import { PaperContainer } from "@components/paper-container";

class AuthenticationContainerClass extends React.PureComponent<WithStyles<typeof AuthenticationContainerStyles>> {
    public render(): JSX.Element {
        return <PaperContainer>
            <LoginComponent authenticate={() => null} />
        </PaperContainer>;
    }
}
export const AuthenticationContainer = hot(withStyles(AuthenticationContainerStyles)(AuthenticationContainerClass));