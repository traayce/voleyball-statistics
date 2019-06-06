
import * as React from "react";
import { Grid, Typography, createStyles, WithStyles, withStyles, Button, Theme } from "@material-ui/core";
import classNames = require("classnames");
const styles = (theme: Theme) => createStyles({
    Player: {
        [theme.breakpoints.up("md")]: {
            padding: "20px"
        }
    },
    PlayerNumber: {

    },
    Text: {
        color: "white"
    }
});

interface OwnProps {
    teamName: string;
    teamSetScore: string;
    teamPointScore: number;
    isSelected?: boolean;
    onClick?: React.MouseEventHandler;
    isLoading: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;
class MatchTeamPointComponentClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { classes, teamName, onClick, teamSetScore, teamPointScore, isLoading } = this.props;
        return <Button variant="contained" color="primary" onClick={onClick} disabled={isLoading}>
            <Grid container className={classNames(classes.Player)}>
                <Grid className={classes.PlayerNumber}
                    direction="column"
                    justify="center"
                    alignItems="center">
                    {/* <Add fontSize="large" /> */}
                    <Typography variant="h6" className={classes.Text}>{teamPointScore}</Typography>
                    <Typography variant="subtitle1" className={classes.Text}>{teamSetScore}</Typography>
                    <Typography variant="button" className={classes.Text}>{teamName}</Typography>
                </Grid>
            </Grid>
        </Button>;
    }
}

export const MatchTeamPointComponent = withStyles(styles)(MatchTeamPointComponentClass);