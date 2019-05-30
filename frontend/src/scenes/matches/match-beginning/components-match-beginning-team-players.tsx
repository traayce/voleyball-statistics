import * as React from "react";
import { WithStyles, withStyles, Grid, Theme, createStyles, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Checkbox, Typography } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import { PlayerModel } from "src/types";
export const styles = (theme: Theme) => createStyles({
    Root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
});

interface Params {
    teamName: string;
    teamPlayers: PlayerModel[];
    selectedIds: number[];
    onSelect: (teamId: number, playerId: number) => React.MouseEventHandler<HTMLInputElement>;
}

type Props = WithStyles<typeof styles> & Params;
class MatchBeginningComponentClass extends React.Component<Props> {
    public render(): JSX.Element | null {
        const { classes } = this.props;
        const { teamPlayers, teamName, onSelect, selectedIds } = this.props;
        return <Grid item>
            <Typography>{teamName}</Typography>
            <List dense className={classes.Root}>
                {teamPlayers.map(value => (
                    <ListItem key={value.id} button onClick={onSelect(value.teamId, value.id)}>
                        <ListItemAvatar>
                            <Person />
                        </ListItemAvatar>
                        <ListItemText primary={`${value.name} ${value.number}`} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                checked={selectedIds.some(x => x === value.id)}
                                onClick={onSelect(value.teamId, value.id)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Grid>;
    }
}

export const TeamListComponent = withStyles(styles)(MatchBeginningComponentClass);