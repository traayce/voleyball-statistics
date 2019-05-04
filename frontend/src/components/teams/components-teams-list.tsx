import * as React from "react";
import { LinearProgress, WithStyles, withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { MapStateToProps, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { TeamModel, TeamCreateModel } from "src/types";
import { teamReducerActions } from "@reducers/team";
import { IStore } from "@store/state";
import { TeamFormComponent } from "./form/components-teams-form-component";


import { createStyles, Theme } from "@material-ui/core/styles";

export const styles = (theme: Theme) => createStyles({
});
interface StateProps {
    isLoading: boolean;
    teams: Array<TeamModel>;
    error?: boolean;
    isLoaded: boolean;
}

interface DispatchProps {
    dispatch: ThunkDispatch<object, void, Action<any>>;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

interface State {
    editingObject: TeamCreateModel | undefined;
    isEditorOpen: boolean;
}

class TeamsListComponentClass extends React.Component<Props, State> {
    public initialState: State = {
        editingObject: undefined,
        isEditorOpen: false
    };
    public state: State = this.initialState;
    public static MapStateToProps: MapStateToProps<StateProps, object, IStore> = ({ teams }) => ({
        teams: teams.teams,
        isLoading: teams.isLoading,
        error: teams.error != null,
        isLoaded: teams.isLoaded
    })

    public render(): JSX.Element {
        const { teams, isLoading, error, isLoaded } = this.props;
        if (!isLoaded && !isLoading && error != null) {
            this.getMatches();
        }

        return <Grid>
            {this.renderEditor()}
            {isLoading && <LinearProgress />}
            <Grid container alignItems="center">Varžybos {error}
                <br />
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={this.getMatches}>Perkrauti</Button>
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={this.openEditor()}>Sukurti naują</Button>
            </Grid>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pavadinimas</TableCell>
                            <TableCell align="right">Miestas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map(row => (
                            <TableRow key={row.id} onClick={this.openEditor(row)}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.city}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Grid>;
    }

    private openEditor = (team?: TeamModel) => () => {
        this.setState({
            editingObject: team !== undefined ? {
                id: team.id,
                name: team.name,
                city: team.city
            } : undefined, isEditorOpen: true
        });
    }

    private renderEditor = () => {
        const { editingObject, isEditorOpen } = this.state;
        if (!isEditorOpen)
            return null;
        return <Dialog
            open={true}
            onClose={this.onModalClose()}
        >
            <DialogTitle id="alert-dialog-title">Komandos forma</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <TeamFormComponent team={editingObject} onClose={this.onModalClose(true)} />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.onModalClose()} color="primary">
                    Uždaryti
      </Button>
            </DialogActions>
        </Dialog>;
    }

    private onModalClose = (refetch?: boolean) => () => {
        this.setState({ editingObject: undefined, isEditorOpen: false });
        if (refetch) {
            this.getMatches();
        }
    }

    private getMatches = () => {
        const { dispatch } = this.props;
        dispatch(teamReducerActions.getTeams());
    }
}
export const TeamsListComponent = withStyles(styles)(connect(TeamsListComponentClass.MapStateToProps)(TeamsListComponentClass));