import * as React from "react";
import { Grid, withStyles, WithStyles } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { HeaderComponent } from "./app-header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./app-private-route";
import { MapStateToProps, connect } from "react-redux";
import { IStore } from "src/store/state";
import { AppContainerStyles } from "./app-styles";
import { AuthenticationContainer } from "@scenes/authentication/components-authentication-container";
import { MatchBeginningContainer, MatchContainer, MatchListContainer } from "@scenes/matches";
import { ContactsComponent } from "@scenes/about/components-about";
import { TeamsLisContainerComponent } from "@scenes/teams/components-teams-container";
interface ReduxProps {
    isLoggedIn: boolean;
}
class AppComponentClass extends React.PureComponent<ReduxProps & WithStyles<typeof AppContainerStyles>> {
    public static MapStateToProps: MapStateToProps<ReduxProps, {}, IStore> = ({ authentication }) => ({
        isLoggedIn: authentication.token !== undefined
    })
    public render(): JSX.Element {
        const { isLoggedIn, classes } = this.props;
        return <Router>
            <Grid container className={classes.Root}>
                <HeaderComponent isAuthenticated={isLoggedIn} />
                <Route exact path="/" component={AuthenticationContainer} />
                <Switch>
                    <PrivateRoute path={`/matches/:id/setup`} component={MatchBeginningContainer} isLoggedIn={isLoggedIn} />
                    <PrivateRoute path={`/matches/:id`} component={MatchContainer} isLoggedIn={isLoggedIn} />
                </Switch>
                <Route exact path="/matches" component={MatchListContainer} />
                <PrivateRoute path="/contacts" component={ContactsComponent} isLoggedIn={isLoggedIn} />
                <PrivateRoute exact path="/teams" component={TeamsLisContainerComponent} isLoggedIn={isLoggedIn} />
            </Grid>
        </Router>;
    }
}
export const AppComponent = hot(withStyles(AppContainerStyles)(connect(AppComponentClass.MapStateToProps)(AppComponentClass)));