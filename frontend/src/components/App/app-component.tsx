import * as React from "react";
import { Grid } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { AuthenticationContainer } from "@components/authentication/components-authentication-container";
import { HeaderComponent } from "./app-header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContactsComponent } from "@components/about/components-about";

class AppComponentClass extends React.PureComponent {
    public render(): JSX.Element {
        return <Router>
            <Grid container >
                <HeaderComponent isAuthenticated={true} />
                <Route exact path="/" component={AuthenticationContainer} />
                <Route path="/contacts" component={ContactsComponent} />
            </Grid>
        </Router>;
    }
}
export const AppComponent = hot(AppComponentClass);