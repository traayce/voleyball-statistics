import * as React from "react";
import { Grid, withStyles, WithStyles } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { AuthenticationContainer } from "@components/authentication/components-authentication-container";
import { HeaderComponent } from "./app-header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContactsComponent } from "@components/about/components-about";
import { PrivateRoute } from "./app-private-route";
import { MapStateToProps, connect } from "react-redux";
import { IStore } from "src/store/state";
import { MatchListContainer, MatchContainer, MatchBeginningContainer } from "@components/matches";
import { AppContainerStyles } from "./app-styles";
import { TeamsLisContainerComponent } from "@components/teams/components-teams-container";
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
                    <Route path={`/matches/:id/setup`} component={MatchBeginningContainer} />
                    <Route path={`/matches/:id`} component={MatchContainer} />
                </Switch>
                <Route exact path="/matches" component={MatchListContainer} />
                <PrivateRoute path="/contacts" component={ContactsComponent} isLoggedIn={isLoggedIn} />
                <Route exact path="/teams" component={TeamsLisContainerComponent} />
            </Grid>
        </Router>;
    }
}
export const AppComponent = hot(withStyles(AppContainerStyles)(connect(AppComponentClass.MapStateToProps)(AppComponentClass)));