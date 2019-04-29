
import * as React from "react";
import { Grid, Typography, createStyles, WithStyles, withStyles } from "@material-ui/core";

const styles = () => createStyles({
    Player: {
        width: "85px",
        height: "85px",
        backgroundColor: "red",
        border: "5px solid black"
    },
    PlayerNumber: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
        fontSize: "3em"
    }
});
interface OwnProps {
    playerNumber: number;
}

type Props = OwnProps & WithStyles<typeof styles>;
class MatchPlayerClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { classes, playerNumber } = this.props;
        return <Grid container className={classes.Player}>
            <Typography className={classes.PlayerNumber}>{playerNumber}</Typography>
        </Grid>;
    }
}

export const MatchPlayer = withStyles(styles)(MatchPlayerClass);