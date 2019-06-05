import * as React from "react";
import { WithStyles, withStyles, Grid, Theme, createStyles, Typography, Button } from "@material-ui/core";
import { IStore } from "@store/state";
import { MatchModel } from "src/types";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { actions } from "@reducers/match";
import { TeamListComponent } from "./components-match-beginning-team-players";
import { matchPlayerApiCommands } from "@api/match-player";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { matchApiCommands } from "@api/match";
export const styles = (theme: Theme) => createStyles({
    Root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    Error: {
        color: "#D8000C",
        backgroundColor: "#FEEFB3",
        margin: "10px 22px",
        fontSize: "2em",
        verticalAlign: "center"
    },
    Button: {
        width: "100%",
        maxWidth: "200px"
    }
});
interface StateProps {
    matchModel?: MatchModel;
    isLoading: boolean;
    error?: string;
    isLoaded: boolean;
}

interface DispatchProps {
    dispatch: ThunkDispatch<object, void, Action>;
}

interface Params {
    id: string;
}

interface State {
    teamAIds: number[];
    teamBIds: number[];
    error?: string;
}

type Props = WithStyles<typeof styles> & Params & StateProps & DispatchProps & RouteComponentProps;
class MatchBeginningComponentClass extends React.Component<Props, State> {
    public state: State = {
        teamAIds: [],
        teamBIds: [],
    };
    public static MapStateToProps: MapStateToProps<StateProps, Params, IStore> = ({ matches }, { id }) => ({
        matchModel: matches.matchesList.find(x => x.id.toString() === id),
        isLoading: matches.isLoading,
        error: matches.error,
        isLoaded: matches.isLoaded
    })

    private getMatches = (id: string) => {
        const { dispatch } = this.props;
        dispatch(actions.getMatches([id]));
    }

    private onPlayerClick = (isTeamA: boolean) => (teamId: number, playerId: number): React.MouseEventHandler => () => {
        const array = isTeamA ? this.state.teamAIds : this.state.teamBIds;
        const currentIndex = array.indexOf(playerId);
        const newChecked = array;
        if (currentIndex === -1) {
            if (newChecked.length >= 6) {
                this.setState({ error: "Komandų startinė sudėtis turi sudaryti po 6 žaidėjus." });
                window.scrollTo(0, 0);
                return;
            }
            newChecked.push(playerId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({ error: undefined });
        isTeamA ? this.setState({
            teamAIds: newChecked,
            error: undefined
        }) : this.setState({
            teamBIds: newChecked,
        });
    }

    private onSubmit: React.MouseEventHandler = async () => {
        const { teamAIds, teamBIds } = this.state;
        const { matchModel, id, history, dispatch } = this.props;
        if (teamAIds.length !== 6 || teamBIds.length !== 6) {
            this.setState({ error: "Privalote pasirinkti po 6 žaidėjus kiekvienoje komandoje" });
            return;
        }
        if (matchModel == null) return;
        const matchId = (id as unknown) as number;
        try {
            await teamAIds.forEach(x => {
                matchPlayerApiCommands.post({
                    id: 0,
                    playerId: x,
                    teamId: matchModel.teamA.id,
                    matchId: matchId,
                    isOnCourt: true
                });
            });

            await teamBIds.forEach(x => {
                matchPlayerApiCommands.post({
                    id: 0,
                    playerId: x,
                    teamId: matchModel.teamB.id,
                    matchId: matchId,
                    isOnCourt: true
                });
            });

            await matchApiCommands.patch(matchId, {
                isStarted: true
            });
        }
        catch (e) {
            this.setState({ error: "Sistemos klaida. Pabandykite vėliau." });
            return;
        }
        dispatch(actions.invalidateData());
        history.push(`/matches/${matchId}`);
    }

    public render(): JSX.Element | null {
        const { classes } = this.props;
        const { id, isLoading, isLoaded, matchModel: match, error, history } = this.props;
        const { teamAIds, teamBIds, error: validationError } = this.state;

        if (isLoaded === false && isLoading === false && error === undefined) {
            this.getMatches(id);
        }
        if (match == null) {
            return null;
        }
        if (match.isStarted) {
            history.push(`/matches/${id}`);
            return null;
        }
        return <Grid container
            alignContent="center"
            justify="center">
            <Grid container className={classes.Error} item>
                <Typography variant="body1" color="error">{validationError}</Typography>
            </Grid>
            <Button type="submit" variant="raised" color="primary" onClick={this.onSubmit} className={classes.Button} >
                Pradėti varžybas
                </Button>
            <Grid container justify="center" item xs={12}><Typography variant="body1" align="center">Pasirinkite startinius šešetus (Varžybų metu juos galėsite keisti).</Typography></Grid>
            <Grid item xs={6}>
                <TeamListComponent
                    teamName={match.teamA.name}
                    teamPlayers={match.teamA.players}
                    selectedIds={teamAIds}
                    onSelect={this.onPlayerClick(true)}
                />
            </Grid>
            <Grid item xs={6}>
                <TeamListComponent
                    teamName={match.teamB.name}
                    teamPlayers={match.teamB.players}
                    selectedIds={teamBIds}
                    onSelect={this.onPlayerClick(false)}
                />
            </Grid>
        </Grid>;
    }
}

export const MatchComponent = withRouter(connect(MatchBeginningComponentClass.MapStateToProps)(withStyles(styles)(MatchBeginningComponentClass)));