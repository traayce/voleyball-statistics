
import * as React from "react";
import { Grid, Typography, createStyles, WithStyles, withStyles, Button, Theme } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import classNames = require("classnames");
import { ClsfPlayerPointType } from "src/types";
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
        const { classes, actionName, isSelected, onClick } = this.props;
        return <Button variant="contained" color="primary" className={classes.Button} onClick={onClick} >
            {actionName}
        </Button>;
        // return <Grid container className={classNames(classes.Player, { [classes.Green]: isSelected })} onClick={onClick}>
        //     <Grid className={classes.PlayerNumber}
        //         direction="column"
        //         justify="center"
        //         alignItems="center">
        //         <Add fontSize="large" />
        //         <Typography className={classes.Number}>{actionName}</Typography>
        //     </Grid>
        // </Grid>;
    }
}

export const MatchControl = withStyles(styles)(MatchControlClass);