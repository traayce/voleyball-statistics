
import * as React from "react";
import { Grid, Typography, createStyles, WithStyles, withStyles } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
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
    },
    Number: {
        fontSize: "2em"
    },
    Green: {
        backgroundColor: "green"
    }
});
interface OwnProps {
    playerNumber: number;
    isSelected: boolean;
    onClick: React.MouseEventHandler;
}

type Props = OwnProps & WithStyles<typeof styles>;
class MatchPlayerClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { classes, playerNumber, isSelected, onClick } = this.props;
        return <Grid container className={classNames(classes.Player, { [classes.Green]: isSelected })} onClick={onClick}>
            <Grid className={classes.PlayerNumber}
                direction="column"
                justify="center"
                alignItems="center">
                <Person fontSize="large" />
                <Typography className={classes.Number}>{playerNumber}</Typography>
            </Grid>
        </Grid>;
    }
}

export const MatchPlayer = withStyles(styles)(MatchPlayerClass);