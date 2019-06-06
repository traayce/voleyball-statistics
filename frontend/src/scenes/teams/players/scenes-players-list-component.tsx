import * as React from "react";
import { LinearProgress, WithStyles, withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Typography } from "@material-ui/core";
import { MapStateToProps, connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { TeamModel, TeamCreateModel } from "src/types";
import { teamReducerActions } from "@reducers/team";
import { IStore } from "@store/state";
import { createStyles, Theme } from "@material-ui/core/styles";
import { ModalComponent } from "@components/modal";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { playerApiCommands } from "@api/player";
import { PlayerFormComponent } from "./scenes-players-form-component";
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

interface OwnProps {
    model: TeamModel;
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles> & OwnProps;

interface State {
    editingObjectId?: number;
    isEditorOpen: boolean;
    selected: number[]
}

class PlayersListComponentClass extends React.Component<Props, State> {
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
        const { teams, isLoading, error, isLoaded, model } = this.props;
        if (!isLoaded && !isLoading && error != null) {
            this.getMatches();
        }

        return <Grid>
            {this.renderEditor()}
            <Typography variant="h6" align="center">Komandos žaidėjų valdymas</Typography>
            <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={this.openEditor()}>Pridėti naują</Button>
            {
                model != null && <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" padding="none">
                                {this.state.selected.length > 0 && <DeleteIcon color="action" onClick={this.onPlayerDelete} />}
                            </TableCell>
                            <TableCell padding="none">Vardas</TableCell>
                            <TableCell padding="none">Numeris</TableCell>
                            <TableCell padding="none" align="right">Valdymas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {model.players.map((row, index) => {
                            const isItemSelected = this.isSelected(row.id);
                            return <TableRow key={row.id} selected={isItemSelected}>
                                <TableCell padding="none">
                                    <Checkbox
                                        checked={isItemSelected}
                                        onClick={this.handleClick(row.id)}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    {row.name}
                                </TableCell>
                                <TableCell padding="none">{row.number}</TableCell>
                                <TableCell padding="none" align="right"><EditIcon onClick={this.openEditor(index)} /></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            }
        </Grid >;
    }

    private openEditor = (player?: number) => () => {
        this.setState({
            editingObjectId: player, isEditorOpen: true
        });
    }

    private renderEditor = () => {
        const { editingObjectId: editingObject, isEditorOpen } = this.state;
        if (!isEditorOpen)
            return null;
        const model = editingObject != null ? this.props.model.players[editingObject] : undefined;
        return <ModalComponent
            title="Žaidėjo forma"
            isOpen={true}
            onClose={this.onModalClose()}
            buttonActions={
                [<Button onClick={this.onModalClose()} color="primary">
                    Uždaryti
</Button>]}
        >
            <PlayerFormComponent player={model} teamId={this.props.model.id} onClose={this.onModalClose(true)} />
        </ModalComponent >;
    }

    private onPlayerDelete: React.MouseEventHandler = async () => {
        console.log("onplayerdelete");
        const { selected } = this.state;
        try {
            await playerApiCommands.deletePlayers(selected);
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
export const PlayersListComponent = withStyles(styles)(connect(PlayersListComponentClass.MapStateToProps)(PlayersListComponentClass));