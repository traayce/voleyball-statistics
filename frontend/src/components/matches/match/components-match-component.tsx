import * as React from "react";
import { MatchesContainerStyles } from "./components-match-styles";
import { WithStyles, withStyles, Grid, Menu, MenuItem } from "@material-ui/core";
import { MatchPlayer } from "./components-match-player";
import { IStore } from "@store/state";
import { MatchModel } from "src/types";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { actions } from "@reducers/match";
import { MatchControl } from "./components-match-control";
import { matchPointApiCommands } from "@api/match-point";
import { playerPointApiCommands } from "@api/player-point";
import { MatchTeamPointComponent } from "./components-match-team-point-component";
import { NotificationContainer, NotificationManager } from "react-notifications";
interface StateProps {
    match?: MatchModel;
    isLoading: boolean;
    error?: string;
    isLoaded: boolean;
}
enum ClsfPlayerPointType {
    Point = 1,
    Block = 2,
    Assist = 3,
    Turnover = 4,
    Ace = 5,
    CardYellow = 6,
    CardRed = 7
}
interface DispatchProps {
    dispatch: ThunkDispatch<object, void, Action>;
}

interface Params {
    id: string;
}

interface State {
    selected: number;
    anchor: HTMLElement | null;
}

type Props = WithStyles<typeof MatchesContainerStyles> & Params & StateProps & DispatchProps;
class MatchComponentClass extends React.PureComponent<Props, State> {

    public static MapStateToProps: MapStateToProps<StateProps, Params, IStore> = ({ matches }, { id }) => ({
        match: matches.matchesList.find(x => x.id.toString() === id),
        isLoading: matches.isLoading,
        error: matches.error,
        isLoaded: matches.isLoaded
    })

    public static MapDispatchToProps: MapDispatchToProps<DispatchProps, object> = (dispatch: ThunkDispatch<object, void, Action>, props) => ({
        dispatch
    })

    public state: State = {
        selected: 0,
        anchor: null
    };

    private getMatches = (id: string) => {
        const { dispatch } = this.props;
        dispatch(actions.getMatches([id]));
    }

    private onPlayerClick = (playerId: number): React.MouseEventHandler => () => {
        this.setState(state => ({ selected: state.selected === playerId ? 0 : playerId }));
    }

    public render(): JSX.Element | null {
        const { classes, match } = this.props;
        console.log(this.props);
        const { id, isLoading, error, isLoaded } = this.props;
        const { selected, anchor } = this.state;

        if (isLoaded === false && isLoading === false && error === undefined) {
            this.getMatches(id);
        }
        if (match == null) {
            return null;
        }
        const { matchPlayers } = match;
        const teamAPlayers = matchPlayers.filter(x => x.teamId === match.teamA.id);
        const teamBPlayers = matchPlayers.filter(x => x.teamId === match.teamB.id);
        return <Grid container>
            <Grid className={classes.Map}
                container
                direction="row">
                <Grid container xs={6}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                        xs={4}>
                        <MatchTeamPointComponent
                            onClick={this.onTeamPointActionClick(match.teamA.id)}
                            teamSetScore={`${match.pointsSummary.teamASetPoints} - ${match.pointsSummary.teamBSetPoints}`}
                            teamPointScore={match.pointsSummary.teamAPoints}
                            teamName={match.teamA.name} />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                        xs={4}>
                        {teamAPlayers.slice(0, 3).map(x => <MatchPlayer playerNumber={x.player.number} isSelected={selected === x.player.id} onClick={this.onPlayerClick(x.player.id)} />)}
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                        xs={4} >
                        {teamAPlayers.slice(3, 6).map(x => <MatchPlayer playerNumber={x.player.number} isSelected={selected === x.player.id} onClick={this.onPlayerClick(x.player.id)} />)}
                    </Grid>
                </Grid>
                <Grid container xs={6}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                        xs={4}>
                        {teamBPlayers.slice(0, 3).map(x => <MatchPlayer playerNumber={x.player.number} isSelected={selected === x.player.id} onClick={this.onPlayerClick(x.player.id)} />)}
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                        xs={4}>
                        {teamBPlayers.slice(3, 6).map(x => <MatchPlayer playerNumber={x.player.number} isSelected={selected === x.player.id} onClick={this.onPlayerClick(x.player.id)} />)}
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                        xs={4}>
                        <MatchTeamPointComponent
                            onClick={this.onTeamPointActionClick(match.teamB.id)}
                            teamSetScore={`${match.pointsSummary.teamBSetPoints} - ${match.pointsSummary.teamASetPoints}`}
                            teamPointScore={match.pointsSummary.teamBPoints}
                            teamName={match.teamB.name} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container
                alignItems="stretch"
                direction="row"
                justify="center">
                <MatchControl actionName={"Taškas"} onClick={this.onControlActionClick(ClsfPlayerPointType.Point)} />
                <MatchControl actionName={"Blokas"} onClick={this.onControlActionClick(ClsfPlayerPointType.Block)} />
                <MatchControl actionName={"Neatriamemas padavimas"} onClick={this.onControlActionClick(ClsfPlayerPointType.Ace)} />
                <MatchControl actionName={"Asistuotas smūgis"} onClick={this.onControlActionClick(ClsfPlayerPointType.Assist)} />
                <MatchControl actionName={"Klaida"} onClick={this.onControlActionClick(ClsfPlayerPointType.Turnover)} />
                <MatchControl actionName={"Kita"} onClick={this.onHandleMoreMenu()} />
                <Menu
                    id="menu-appbar"
                    anchorEl={anchor}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchor)}
                    onClose={this.onHandleMoreMenu(true)}
                >
                    <MenuItem onClick={this.onControlActionClick(ClsfPlayerPointType.CardRed)}>Raudona kortelė</MenuItem>
                    <MenuItem onClick={this.onControlActionClick(ClsfPlayerPointType.CardYellow)}>Geltona kortelė</MenuItem>
                    <MenuItem onClick={this.onHandleMoreMenu(true)}>Keitimas</MenuItem>
                </Menu>
            </Grid>
            <NotificationContainer/>
        </Grid>;
    }

    private onHandleMoreMenu = (isClose: boolean = false): React.MouseEventHandler<HTMLElement> => (e) => {
        this.setState({ anchor: isClose ? null : e.currentTarget });
    }

    private onControlActionClick = (action: ClsfPlayerPointType): React.MouseEventHandler => async () => {
        const { selected } = this.state;
        const { match, dispatch } = this.props;
        if (selected === 0) {
            NotificationManager.error("Pirma turite pasirinkti žaidėją!", "Klaida", 3000);
            return;
        }
        if (match == null)
            return;
        const { pointsSummary } = match;
        if (!pointsSummary.points == null || !pointsSummary.points.length) {
            return;
        }
        try {
            const response = await playerPointApiCommands.post({
                id: 0,
                playerId: selected,
                matchPointId: pointsSummary.points.pop().id,
                pointType: action
            });

            this.setState({ selected: 0 });

            dispatch(actions.invalidateData());
        }
        catch (e) {

        }
    }

    private onTeamPointActionClick = (teamId: number): React.MouseEventHandler => async () => {
        if (this.props.match == null)
            return;
        const { dispatch } = this.props;
        const { pointsSummary, id, teamA, teamB } = this.props.match;
        const { setNumber, teamAPoints, teamBPoints, points } = pointsSummary;
        let newSetNumber: number = setNumber;
        let isSetPoint = false;
        if (teamA.id === teamId) {
            if (teamAPoints >= 24 && (teamAPoints - teamBPoints) >= 2) {
                isSetPoint = true;
            }
        } else {
            if (teamBPoints >= 24 && (teamBPoints - teamAPoints) >= 2) {
                isSetPoint = true;
            }
        }
        if (isSetPoint)
            newSetNumber = setNumber + 1;
        try {
            const response = await matchPointApiCommands.post({
                id: 0,
                isMatchPoint: false,
                isSetPoint: isSetPoint,
                setNumber: newSetNumber,
                matchId: id,
                teamId
            });

            dispatch(actions.invalidateData());
        }
        catch (e) {

        }
    }
}

export const MatchComponent = connect(MatchComponentClass.MapStateToProps)(withStyles(MatchesContainerStyles)(MatchComponentClass));