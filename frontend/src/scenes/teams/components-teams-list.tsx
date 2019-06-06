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
import { teamApiCommands } from "@api/team";
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
            <Grid container alignItems="center" justify="flex-end">{error}
                <br />
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={this.getMatches}
                    style={{ marginRight: "5px" }}>Perkrauti</Button>
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
                            <TableCell padding="none">{this.state.selected.length > 0 && <DeleteIcon color="action" onClick={this.onTeamDelete} />}</TableCell>
                            <TableCell padding="none">Pavadinimas</TableCell>
                            <TableCell padding="none" align="right">Miestas</TableCell>
                            <TableCell padding="none" align="right">Redagavimas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell padding="none">
                                    <Checkbox
                                        checked={this.isSelected(row.id)}
                                        onClick={this.handleClick(row.id)}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" padding="none">{row.city}</TableCell>
                                <TableCell padding="none" align="right"><EditIcon onClick={this.openEditor(index)} /></TableCell>
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

    private onTeamDelete: React.MouseEventHandler = async () => {
        const { selected } = this.state;
        try {
            await teamApiCommands.deleteTeams(selected);
            this.props.dispatch(teamReducerActions.getTeams());
            this.setState({ selected: [] });
        }
        catch (e) {
        }
    }

    private handleClick = (id: number): React.MouseEventHandler => (e) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected: number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    }

    private isSelected = (id: number) => this.state.selected.indexOf(id) !== -1;
}
export const TeamsListComponent = withStyles(styles)(connect(TeamsListComponentClass.MapStateToProps)(TeamsListComponentClass));