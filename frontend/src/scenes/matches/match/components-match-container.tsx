import * as React from "react";
import { MatchesContainerStyles } from "./components-match-styles";
import { WithStyles, Grid } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";
import { MatchComponent } from "./components-match-component";

interface Params {
    id?: string;
}
type Props = WithStyles<typeof MatchesContainerStyles> & RouteComponentProps<Params>;
class MatchContainerClass extends React.PureComponent<Props> {
    public render(): JSX.Element | null {
        if (this.props.match.params.id == null) {
            return null;
        }
        return <Grid container>
            <MatchComponent id={this.props.match.params.id} />
        </Grid>;
    }
}

export const MatchContainer = withRouter(MatchContainerClass);