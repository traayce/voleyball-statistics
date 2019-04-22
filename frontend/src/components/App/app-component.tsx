import * as React from "react";
import { Grid } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { AuthenticationContainer } from "@components/authentication/components-authentication-container";
import { HeaderComponent } from "./app-header";

class AppComponentClass extends React.PureComponent {
    public render(): JSX.Element {
        return <Grid container >
            <HeaderComponent isAuthenticated={true} />
            <AuthenticationContainer />
        </Grid>;
    }
}
export const AppComponent = hot(AppComponentClass);