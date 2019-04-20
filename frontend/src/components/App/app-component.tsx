import * as React from "react";
import { Paper } from "@material-ui/core";
import { hot } from "react-hot-loader/root";
import { } from "../authentication/"

class AppComponentClass extends React.PureComponent {
    public render(): JSX.Element {
        return <Paper>
            <div>hellsasdasdsas</div>
        </Paper>;
    }
}
export const AppComponent = hot(AppComponentClass);