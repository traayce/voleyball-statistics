import * as React from "react";
import { MatchesContainerStyles } from "./components-match-styles";
import { WithStyles, Grid, withWidth, Typography } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";
import { MatchComponent } from "./components-match-component";
import { isWidthDown, WithWidth } from "@material-ui/core/withWidth/withWidth";

interface Params {
    id?: string;
}
type Props = WithStyles<typeof MatchesContainerStyles> & RouteComponentProps<Params> & WithWidth;
class MatchContainerClass extends React.PureComponent<Props> {
    public render(): JSX.Element | null {
        if (this.props.match.params.id == null) {
            return null;
        }
        return <Grid container>
            {isWidthDown("xs", this.props.width) ? this.errorMessage() : <MatchComponent id={this.props.match.params.id} />}
        </Grid>;
    }
    private errorMessage = () => {
        return <Grid container alignItems="center" justify="center">
            <Typography variant="h3">Paverskite savo ekraną</Typography>
        </Grid>;
    }
}

export const MatchContainer = withWidth()(withRouter(MatchContainerClass));