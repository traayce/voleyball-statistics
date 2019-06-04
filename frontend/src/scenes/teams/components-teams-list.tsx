import * as React from "react";
import { LinearProgress, WithStyles, withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";
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
    editingObject?: TeamModel;
    isEditorOpen: boolean;
    selected: number[]
}

class TeamsListComponentClass extends React.Component<Props, State> {
    public initialState: State = {
        editingObject: undefined,
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
            editingObject: team, isEditorOpen: true
        });
    }

    private renderEditor = () => {
        const { editingObject, isEditorOpen } = this.state;
        if (!isEditorOpen)
            return null;
        return <ModalComponent
            title="Komandos forma"
            isOpen={true}
            onClose={this.onModalClose()}
            buttonActions={[<Button onClick={this.onModalClose()} color="primary">
                Uždaryti
</Button>]}
        >
            <TeamFormComponent team={editingObject} onClose={this.onModalClose(true)} />
            {editingObject != null && <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            {this.state.selected.length > 0 && <DeleteIcon color="action" onClick={this.onPlayersDelete} />}
                        </TableCell>
                        <TableCell>Vardas</TableCell>
                        <TableCell>Numeris</TableCell>
                        <TableCell align="right">Valdymas</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {editingObject.players.map(row => {
                        const isItemSelected = this.isSelected(row.id);
                        return <TableRow key={row.id} onClick={this.handleClick(row.id)} selected={isItemSelected}>
                            <TableCell>
                                <Checkbox
                                    checked={isItemSelected}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell>{row.number}</TableCell>
                            <TableCell align="right"><EditIcon onClick={this.openEditor(row)} /></TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>}
        </ModalComponent >;
    }

    private onPlayerDelete = (): React.MouseEvent => () => {
        const { selected } = this.props;
    }

    private handleClick = (id: number): React.MouseEvent<HTMLTableRowElement> => (e) => {
        console.log("handleCLick")
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