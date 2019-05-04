
import * as React from "react";
import { Typography, createStyles, WithStyles, withStyles, Button, Theme } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
const styles = (theme: Theme) => createStyles({
    Player: {
        width: "85px",
        height: "85px",
        backgroundColor: "white",
        border: "5px solid black",
        boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)"
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
    },
    Button: {
        margin: theme.spacing.unit,
        minWidth: "100px"
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
        return <Button variant={isSelected ? "contained" : "outlined"} className={classes.Button} color="primary" onClick={onClick}>
            <Person fontSize="large" />
            <Typography className={classes.Number}>{playerNumber}</Typography>
        </Button>;
    }
}

export const MatchPlayer = withStyles(styles)(MatchPlayerClass);