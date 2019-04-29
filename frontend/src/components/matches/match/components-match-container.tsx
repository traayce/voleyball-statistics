import * as React from "react";
import { MatchesContainerStyles } from "./components-match-styles";
import { WithStyles, withStyles, Grid, Typography } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";
import { MatchPlayer } from "./components-match-player";

interface Params {
    id?: string;
}
type Props = WithStyles<typeof MatchesContainerStyles> & RouteComponentProps<Params>;
class MatchContainerClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { classes } = this.props;
        console.log(this.props.match.params.id);
        return <Grid container>
            <Grid className={classes.Map}
                container
                direction="row">
                <Grid container style={{ width: "50%" }}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                        style={{ width: "50%" }}>
                        <MatchPlayer playerNumber={4} />
                        <MatchPlayer playerNumber={12} />
                        <MatchPlayer playerNumber={8} />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                        style={{ width: "50%" }}>
                        <MatchPlayer playerNumber={4} />
                        <MatchPlayer playerNumber={12} />
                        <MatchPlayer playerNumber={8} />
                    </Grid>
                </Grid>
                <Grid container style={{ width: "50%" }}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                        style={{ width: "50%" }}>
                        <MatchPlayer playerNumber={4} />
                        <MatchPlayer playerNumber={12} />
                        <MatchPlayer playerNumber={8} />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                        style={{ width: "50%" }}>
                        <MatchPlayer playerNumber={4} />
                        <MatchPlayer playerNumber={12} />
                        <MatchPlayer playerNumber={8} />
                    </Grid>
                </Grid>
            </Grid>
            <MatchPlayer playerNumber={4} />
            <MatchPlayer playerNumber={4} />
            <MatchPlayer playerNumber={4} />
            <MatchPlayer playerNumber={4} />
        </Grid>;
    }
}

export const MatchContainer = withRouter(withStyles(MatchesContainerStyles)(MatchContainerClass));