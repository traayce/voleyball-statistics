import * as React from "react";
import { Paper } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { AuthenticationContainer } from "@components/authentication/components-authentication-container";

class AppComponentClass extends React.PureComponent {
    public render(): JSX.Element {
        return <Paper>
            <AuthenticationContainer />
            <div>hellsasdasdsas</div>
        </Paper>;
    }
}
export const AppComponent = hot(AppComponentClass);