
import * as React from "react";
import { Typography, createStyles, WithStyles, withStyles, Button, Theme } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
const styles = (theme: Theme) => createStyles({
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