import * as React from "react";
import { LinearProgress, WithStyles, withStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from "@material-ui/core";
import { MapStateToProps, connect } from "react-redux";
import { IStore } from "../../../store/state";
import { MatchesContainerStyles } from "./components-matches-styles";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { MatchModel, MatchCreateModel } from "src/types";
import { actions } from "@reducers/match";
import { MatchCardComponent } from "./components-match-card";
import { MatchFormComponent } from "./form/components-matches-form-component";

interface StateProps {
  isLoading: boolean;
  matches: Array<MatchModel>;
  error?: boolean;
  isLoaded: boolean;
}

interface DispatchProps {
  dispatch: ThunkDispatch<object, void, Action<any>>;
}

type Props = StateProps & DispatchProps & WithStyles<typeof MatchesContainerStyles>;

interface State {
  editingObject: MatchCreateModel | undefined;
  isEditorOpen: boolean;
}

class MatchesClass extends React.Component<Props, State> {
  public initialState: State = {
    editingObject: undefined,
    isEditorOpen: false
  };
  public state: State = this.initialState;
  public static MapStateToProps: MapStateToProps<StateProps, object, IStore> = ({ matches }) => ({
    matches: matches.matchesList,
    isLoading: matches.isLoading,
    error: matches.error != null,
    isLoaded: matches.isLoaded
  })

  public render(): JSX.Element {
    const { matches, isLoading, error, classes, isLoaded } = this.props;
    if (!isLoaded && !isLoading && error != null) {
      this.getMatches();
    }
    if (isLoading) {
      return <Grid className={classes.Container}>
        <LinearProgress />
      </Grid>;
    }
    return <Grid className={classes.Container}>
      {this.renderEditor()}
      <div className={classes.Center}>Varžybos {error}
        <br />
        <Button
          className={classes.Button}
          color="primary"
          type="submit"
          variant="contained"
          onClick={this.getMatches}>Perkrauti</Button>
        <Button
          className={classes.Button}
          color="primary"
          type="submit"
          variant="contained"
          onClick={this.openEditor()}>Sukurti naują</Button>
      </div>
      <div>
        {matches.map((match: MatchModel) => <MatchCardComponent match={match} openEditor={this.openEditor} />)}
      </div>
    </Grid>;
  }

  private openEditor = (match?: MatchModel) => () => {
    this.setState({
      editingObject: match !== undefined ? {
        id: match.id,
        startsAt: match.startsAt,
        location: match.location,
        isStarted: match.isStarted,
        secretaryId: match.secretary.id,
        teamAId: match.teamA.id,
        teamBId: match.teamB.id,
        isFinished: match.isFinished
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
      <DialogTitle id="alert-dialog-title">Varžybų forma</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <MatchFormComponent model={editingObject} onSubmit={this.onModalClose(true)} />
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

  private getMatches = () => {
    const { dispatch } = this.props;
    dispatch(actions.getMatches());
  }
}
export const MatchesListComponent = withStyles(MatchesContainerStyles)(connect(MatchesClass.MapStateToProps)(MatchesClass));