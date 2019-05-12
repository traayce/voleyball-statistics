import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
interface OwnProps {
    component: any;
    path: string;
    isLoggedIn: boolean;
}

export const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }: OwnProps & RouteProps) => (<Route {...rest} render={(props) => (
    isLoggedIn
        ? <Component {...props} />
        : <Redirect to="/" />
)} />);
