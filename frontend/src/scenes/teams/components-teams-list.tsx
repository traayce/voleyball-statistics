import * as React from "react";
import { LinearProgress, WithStyles, withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Typography } from "@material-ui/core";
import { MapStateToProps, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { TeamModel, TeamCreateModel } from "src/types";
import { teamReducerActions } from "@reducers/team";
import { IStore } from "@store/state";
import { TeamFormComponent } from "./form/components-teams-form-component";


import { createStyles, Theme } from "@material-ui/core/styles";
import { ModalComponent } from "@components/modal";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { playerApiCommands } from "@api/player";
import { PlayersListComponent } from "./players/scenes-players-list-component";
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
    editingObjectId?: number;
    isEditorOpen: boolean;
    selected: number[]
}

class TeamsListComponentClass extends React.Component<Props, State> {
    public initialState: State = {
        editingObjectId: undefined,
        isEditorOpen: false,
        selected: []
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
            <Grid container alignItems="center">{error}
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
                        {teams.map((row, index) => (
                            <TableRow key={row.id} onClick={this.openEditor(index)}>
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

    private openEditor = (team?: number) => () => {
        this.setState({
            editingObjectId: team, isEditorOpen: true
        });
    }

    private renderEditor = () => {
        const { editingObjectId: editingObject, isEditorOpen } = this.state;
        if (!isEditorOpen)
            return null;
        const model = editingObject != null ? this.props.teams[editingObject] : undefined;
        return <ModalComponent
            title="Komandos forma"
            isOpen={true}
            onClose={this.onModalClose()}
            buttonActions={
                [<Button onClick={this.onModalClose()} color="primary">
                    Uždaryti
</Button>]}
        >
            <TeamFormComponent team={model} onClose={this.onModalClose(true)} />
            {model != null && <PlayersListComponent model={model} />}
        </ModalComponent >;
    }
    
    private onModalClose = (refetch?: boolean) => () => {
        this.setState({ editingObjectId: undefined, isEditorOpen: false });
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