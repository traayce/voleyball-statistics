import * as React from "react";
import { MatchesContainerStyles } from "./components-match-styles";
import { WithStyles, withStyles, Grid } from "@material-ui/core";
import { MatchPlayer } from "./components-match-player";
import { IStore } from "@store/state";
import { MatchModel } from "src/types";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { actions } from "@reducers/match";
import { MatchControl } from "./components-match-control";
import { matchPointApiCommands } from "@api/match-point";
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
        selected: 0
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
        const { selected } = this.state;

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
                        <MatchControl actionName={match.teamA.name} type={ClsfPlayerPointType.Point} />
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
                        <MatchControl actionName={match.teamB.name} type={ClsfPlayerPointType.Point} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <MatchControl actionName={"Taškas"} type={ClsfPlayerPointType.Point} />
            </Grid>
        </Grid>;
    }

    private onControlActionClick = (action: ClsfPlayerPointType): React.MouseEventHandler => () => {
        const { selected } = this.state;
        if (selected === 0) {
            return;
        }
    }

    private onTeamPointActionClick = (teamId: number): React.MouseEventHandler => () => {
        // matchPointApiCommands.post({
        //     isMatchPoint: false,
        //     isSetPoint: false,
        //     pointNumber:
        // });
    }
}

export const MatchComponent = connect(MatchComponentClass.MapStateToProps)(withStyles(MatchesContainerStyles)(MatchComponentClass));