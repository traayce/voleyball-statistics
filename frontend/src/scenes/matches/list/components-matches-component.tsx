import * as React from "react";
import { LinearProgress, WithStyles, withStyles, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from "@material-ui/core";
import { MapStateToProps, connect } from "react-redux";
import { IStore } from "../../../store/state";
import { MatchesContainerStyles } from "./components-matches-styles";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { MatchModel, RolesEnum } from "src/types";
import { actions } from "@reducers/match";
import { MatchCardComponent } from "./components-match-card";
import { MatchFormComponent } from "./form/components-matches-form-component";
import { hasRole } from "@utils/permissions";

interface StateProps {
  isLoading: boolean;
  matches: Array<MatchModel>;
  error?: boolean;
  isLoaded: boolean;
  role?: string;
}

interface DispatchProps {
  dispatch: ThunkDispatch<object, void, Action<any>>;
}

type Props = StateProps & DispatchProps & WithStyles<typeof MatchesContainerStyles>;

interface State {
  editingObject?: MatchModel;
  isEditorOpen: boolean;
}

class MatchesClass extends React.Component<Props, State> {
  public initialState: State = {
    editingObject: undefined,
    isEditorOpen: false
  };
  public state: State = this.initialState;
  public static MapStateToProps: MapStateToProps<StateProps, object, IStore> = ({ matches, authentication }) => ({
    matches: matches.matchesList,
    isLoading: matches.isLoading,
    error: matches.error != null,
    isLoaded: matches.isLoaded,
    role: authentication.role
  })

  public render(): JSX.Element {
    const { matches, isLoading, error, classes, isLoaded, role } = this.props;
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
        {hasRole([RolesEnum.Secretary, RolesEnum.Admin], role as string) && <Button
          className={classes.Button}
          color="primary"
          type="submit"
          variant="contained"
          onClick={this.openEditor()}>Sukurti naują</Button>}
      </div>
      <div>
        {matches.map((match: MatchModel) => <MatchCardComponent key={`match-${match.id}`} match={match} openEditor={this.openEditor} />)}
      </div>
    </Grid>;
  }

  private openEditor = (match?: MatchModel) => () => {
    this.setState({
      editingObject: match, isEditorOpen: true
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
      <DialogTitle id="alert-dialog-title">Varžybos</DialogTitle>
      <DialogContent>
        <MatchFormComponent model={editingObject} onClose={this.onModalClose(true)} />
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
  dispatch(actions.getMatches());
}
}
export const MatchesListComponent = withStyles(MatchesContainerStyles)(connect(MatchesClass.MapStateToProps)(MatchesClass));