import * as React from "react";
import { Grid, withStyles, WithStyles } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { HeaderComponent } from "./app-header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./app-private-route";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { IStore } from "src/store/state";
import { AppContainerStyles } from "./app-styles";
import { AuthenticationContainer } from "@scenes/authentication/components-authentication-container";
import { MatchBeginningContainer, MatchContainer, MatchListContainer } from "@scenes/matches";
import { ContactsComponent } from "@scenes/about/components-about";
import { TeamsLisContainerComponent } from "@scenes/teams/components-teams-container";
import { ScenesRegistrationContainer } from "@scenes/authentication/registration/scenes-registration-container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { authenticationReducerActions } from "@reducers/authentication";
interface ReduxProps {
    isLoggedIn: boolean;
    role?: string;
    isInfoLoading: boolean;
}

interface DispatchProps {
    getInfo(): void;
}
class AppComponentClass extends React.PureComponent<ReduxProps & WithStyles<typeof AppContainerStyles> & DispatchProps> {
    public static MapStateToProps: MapStateToProps<ReduxProps, {}, IStore> = ({ authentication }) => ({
        isLoggedIn: authentication.token !== undefined,
        role: authentication.role,
        isInfoLoading: authentication.isRoleLoading
    })

    public static MapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch: ThunkDispatch<object, void, Action>) => {
        return ({
            getInfo: () => dispatch(authenticationReducerActions.getInfo())
        });
    }
    public render(): JSX.Element {
        const { isLoggedIn, role, isInfoLoading, classes, getInfo } = this.props;
        if (role == null && !isInfoLoading) {
            getInfo();
        }
        return <Router>
            <Grid container className={classes.Root}>
                <HeaderComponent isAuthenticated={isLoggedIn} />
                {isInfoLoading && <CircularProgress size={100} />}
                <Route exact path="/" component={MatchListContainer} />
                <Route exact path="/login" component={AuthenticationContainer} />
                <Route exact path="/register" component={ScenesRegistrationContainer} />
                <Switch>
                    <PrivateRoute path={`/matches/:id/setup`} component={MatchBeginningContainer} isLoggedIn={isLoggedIn} />
                    <PrivateRoute path={`/matches/:id`} component={MatchContainer} isLoggedIn={isLoggedIn} />
                </Switch>
                <Route exact path="/matches" component={MatchListContainer} />
                <PrivateRoute path="/contacts" component={ContactsComponent} isLoggedIn={isLoggedIn} />
                <PrivateRoute exact path="/teams" component={TeamsLisContainerComponent} isLoggedIn={isLoggedIn && role == "Secretary"} />
            </Grid>
        </Router>;
    }
}
export const AppComponent = hot(withStyles(AppContainerStyles)(connect(AppComponentClass.MapStateToProps, AppComponentClass.MapDispatchToProps)(AppComponentClass)));