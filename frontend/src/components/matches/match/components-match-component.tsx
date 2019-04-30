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
interface StateProps {
    match?: MatchModel;
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
type Props = WithStyles<typeof MatchesContainerStyles> & Params & StateProps & DispatchProps;
class MatchComponentClass extends React.PureComponent<Props> {

    public static MapStateToProps: MapStateToProps<StateProps, Params, IStore> = ({ matches }, { id }) => ({
        match: matches.matchesList.find(x => x.id.toString() === id),
        isLoading: matches.isLoading,
        error: matches.error,
        isLoaded: matches.isLoaded
    })

    public static MapDispatchToProps: MapDispatchToProps<DispatchProps, object> = (dispatch: ThunkDispatch<object, void, Action>, props) => ({
        dispatch
    })

    private getMatches = (id: string) => {
        const { dispatch } = this.props;
        dispatch(actions.getMatches([id]));
    }

    public render(): JSX.Element {
        const { classes } = this.props;
        console.log(this.props);
        const { id, isLoading, error, isLoaded } = this.props;

        if (isLoaded === false && isLoading === false && error === undefined) {
            this.getMatches(id);
        }
        return <Grid container>
            <Grid className={classes.Map}
                container
                direction="row">
                <Grid container style={{ width: "50%" }}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                        style={{ width: "50%" }}>
                        <MatchPlayer playerNumber={4} />
                        <MatchPlayer playerNumber={12} />
                        <MatchPlayer playerNumber={8} />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                        style={{ width: "50%" }}>
                        <MatchPlayer playerNumber={4} />
                        <MatchPlayer playerNumber={12} />
                        <MatchPlayer playerNumber={8} />
                    </Grid>
                </Grid>
                <Grid container style={{ width: "50%" }}>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                        style={{ width: "50%" }}>
                        <MatchPlayer playerNumber={4} />
                        <MatchPlayer playerNumber={12} />
                        <MatchPlayer playerNumber={8} />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                        style={{ width: "50%" }}>
                        <MatchPlayer playerNumber={4} />
                        <MatchPlayer playerNumber={12} />
                        <MatchPlayer playerNumber={8} />
                    </Grid>
                </Grid>
            </Grid>
            <MatchPlayer playerNumber={4} />
            <MatchPlayer playerNumber={4} />
            <MatchPlayer playerNumber={4} />
            <MatchPlayer playerNumber={4} />
        </Grid>;
    }
}

export const MatchComponent = connect(MatchComponentClass.MapStateToProps)(withStyles(MatchesContainerStyles)(MatchComponentClass));