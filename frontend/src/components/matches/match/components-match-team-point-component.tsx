
import * as React from "react";
import { Grid, Typography, createStyles, WithStyles, withStyles } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import classNames = require("classnames");
const styles = () => createStyles({
    Player: {
        width: "85px",
        height: "85px",
        backgroundColor: "white",
        border: "5px solid black"
    },
    PlayerNumber: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        width: "100%",
    }
});

interface OwnProps {
    teamName: string;
    teamSetScore: string;
    teamPointScore: number;
    isSelected?: boolean;
    onClick?: React.MouseEventHandler;
}

type Props = OwnProps & WithStyles<typeof styles>;
class MatchTeamPointComponentClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { classes, teamName, onClick, teamSetScore, teamPointScore } = this.props;
        return <Grid container className={classNames(classes.Player)} onClick={onClick}>
            <Grid className={classes.PlayerNumber}
                direction="column"
                justify="center"
                alignItems="center">
                {/* <Add fontSize="large" /> */}
                <Typography variant="h6">{teamPointScore}</Typography>
                <Typography variant="subtitle1">{teamSetScore}</Typography>
                <Typography variant="button">{teamName}</Typography>
            </Grid>
        </Grid>;
    }
}

export const MatchTeamPointComponent = withStyles(styles)(MatchTeamPointComponentClass);