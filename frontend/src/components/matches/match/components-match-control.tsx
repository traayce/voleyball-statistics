
import * as React from "react";
import { createStyles, WithStyles, withStyles, Button, Theme } from "@material-ui/core";
const styles = (theme: Theme) => createStyles({
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
        fontSize: "1em"
    },
    Green: {
        backgroundColor: "green"
    },
    Button: {
        margin: theme.spacing.unit,
        width: "13%",
        marginTop: 0,
        marginBottom: 0
    }
});

interface OwnProps {
    actionName: string;
    isSelected?: boolean;
    onClick?: React.MouseEventHandler;
}

type Props = OwnProps & WithStyles<typeof styles>;
class MatchControlClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { classes, actionName, onClick } = this.props;
        return <Button variant="contained" color="primary" className={classes.Button} onClick={onClick} >
            {actionName}
        </Button>;
    }
}

export const MatchControl = withStyles(styles)(MatchControlClass);