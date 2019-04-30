import * as React from "react";
import { LinearProgress, WithStyles, withStyles, Button, Card, CardActionArea, CardContent, Typography, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Grid } from "@material-ui/core";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { IStore } from "../../../store/state";
import { MatchesContainerStyles } from "./components-matches-styles";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { MatchFormComponent } from "./form/components-matches-form-component";
import { MatchModel, MatchCreateModel } from "src/types";
import { actions } from "@reducers/match";

interface StateProps {
  isLoading: boolean;
  matches: Array<MatchModel>;
  error?: boolean;
  isLoaded: boolean;
}

interface DispatchProps {
  dispatch?: ThunkDispatch<object, void, Action<any>>;
}

type Props = StateProps & DispatchProps & WithStyles<typeof MatchesContainerStyles>;

interface State {
  editingObject: MatchCreateModel | undefined;
  isEditorOpen: boolean;
  searchText: string;
}

class MatchesClass extends React.Component<Props, State> {
  public initialState: State = {
    editingObject: undefined,
    isEditorOpen: false,
    searchText: ""
  };
  public state: State = this.initialState;
  public static MapStateToProps: MapStateToProps<StateProps, object, IStore> = ({ matches }) => ({
    matches: matches.matchesList,
    isLoading: matches.isLoading,
    error: matches.error != null,
    isLoaded: matches.isLoaded
  })

  public static MapDispatchToProps: MapDispatchToProps<DispatchProps, object> = (dispatch: ThunkDispatch<object, void, Action>, props) => ({
    dispatch: dispatch
  })

  public render(): JSX.Element {
    const { matches, isLoading, error, classes, isLoaded } = this.props;
    if (isLoaded === false && isLoading === false && error === undefined) {
      this.getMatches();
    }
    if (isLoading) {
      return <Grid className={classes.Container}>
        <LinearProgress />
      </Grid>;
    }
    return <Grid className={classes.Container}>
      {this.renderEditor()}
      <div className={classes.Center}>Matches ({error})
            <br />
        <TextField
          id="standard-name"
          label="Enter Match Name"
          value={this.state.searchText}
          onChange={this.handleSearchTextBoxChange}
          margin="normal"
        />
        <br />
        <Button
          className={classes.Button}
          color="primary"
          type="submit"
          variant="contained"
          onClick={this.getMatches}>Fetch Matches</Button>
        <Button
          className={classes.Button}
          color="primary"
          type="submit"
          variant="contained"
          onClick={this.openEditor()}>Create New</Button>
      </div>
      <div>
        {this.renderMatches(matches)}
      </div>
    </Grid>;
  }

  private renderMatches = (matches: MatchModel[]) => {
    const { classes } = this.props;
    return matches.map((match: MatchModel) => (
      <Card className={classes.card}>
        <CardActionArea onClick={this.openEditor(match)}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Match
          </Typography>
            <Typography component="p">
              {JSON.stringify(match)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={this.onDelete(match.id)}>
            Delete
        </Button>
          <Button size="small" color="primary" onClick={this.openEditor(match)}>
            Edit
        </Button>
        </CardActions>
      </Card>
    ));
  }

  private handleSearchTextBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: e.target.value });
  }

  private openEditor = (match?: MatchModel) => (e: React.MouseEvent<HTMLInputElement>) => {
    this.setState({
      editingObject: match !== undefined ? {
        id: match.id,
        startsAt: match.startsAt,
        location: match.location,
        isStarted: match.isStarted,
        secretaryId: match.secretary.id,
        teamAId: match.teamA.id,
        teamBId: match.teamB.id
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
      <DialogTitle id="alert-dialog-title">Match Form</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <MatchFormComponent model={editingObject} onFinished={this.onModalClose(true)} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.onModalClose()} color="primary">
          Close
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

  private onDelete = (id: number) => (e: React.MouseEvent<HTMLInputElement>) => {
    const { dispatch } = this.props;
    if (dispatch != null) {
      dispatch(actions.deleteMatch(id));
    }
    this.getMatches();
  }

  private getMatches = () => {
    const { dispatch } = this.props;
    if (dispatch != null) {
      dispatch(actions.getMatches());
    }
  }
}
export const MatchesListComponent = withStyles(MatchesContainerStyles)(connect(MatchesClass.MapStateToProps, MatchesClass.MapDispatchToProps)(MatchesClass));