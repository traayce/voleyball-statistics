import * as React from "react";
import { Grid } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { AuthenticationContainer } from "@components/authentication/components-authentication-container";
import { HeaderComponent } from "./app-header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContactsComponent } from "@components/about/components-about";
import { PrivateRoute } from "./app-private-route";
import { MapStateToProps, connect } from "react-redux";
import { IStore } from "src/store/state";
import { MatchListContainer, MatchContainer } from "@components/matches";
interface ReduxProps {
    isLoggedIn: boolean;
}
class AppComponentClass extends React.PureComponent<ReduxProps> {
    public static MapStateToProps: MapStateToProps<ReduxProps, {}, IStore> = ({ authentication }) => ({
        isLoggedIn: authentication.token !== undefined
    })
    public render(): JSX.Element {
        const { isLoggedIn } = this.props;
        return <Router>
            <Grid container style={{ height: "100%" }}>
                <HeaderComponent isAuthenticated={isLoggedIn} />
                <Route exact path="/" component={AuthenticationContainer} />
                <Route path={`/matches/:id`} component={MatchContainer} />
                <Route exact path="/matches" component={MatchListContainer} />
                <PrivateRoute path="/contacts" component={ContactsComponent} isLoggedIn={isLoggedIn} />
            </Grid>
        </Router>;
    }
}
export const AppComponent = hot(connect(AppComponentClass.MapStateToProps)(AppComponentClass));