import * as React from "react";
import { Redirect, Route } from "react-router-dom";
interface OwnProps {
    component: any;
    path: string;
    isLoggedIn: boolean;
}

export const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }: OwnProps) => (<Route {...rest} render={(props) => (
    isLoggedIn
        ? <Component {...props} />
        : <Redirect to="/" />
)} />);
