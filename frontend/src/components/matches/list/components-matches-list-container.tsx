import * as React from "react";
import { MatchesContainerStyles } from "./components-matches-styles";
import { WithStyles, Paper, withStyles } from "@material-ui/core";
import { MatchesListComponent } from "./components-matches-component";

class MatchContainerClass extends React.PureComponent<WithStyles<typeof MatchesContainerStyles>> {
    public render(): JSX.Element {
        const { classes } = this.props;
        return <Paper className={classes.Container}>
            <MatchesListComponent />
        </Paper>;
    }
}
export const MatchListContainer = withStyles(MatchesContainerStyles)(MatchContainerClass);