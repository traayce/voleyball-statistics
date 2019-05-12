import * as React from "react";
import { MatchStatisticsModel } from "src/types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { matchApiCommands } from "@api/match";
import { MatchStatisticsComponent } from "@components/match/components-match-statistics";

const styles = () => createStyles({
});

interface OwnProps {
    id: number;
}

interface State {
    model: MatchStatisticsModel | null;
    isLoading: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

class MatchStatisticsContainerClass extends React.Component<Props, State> {
    public state: State = {
        model: null,
        isLoading: false
    };
    public render(): JSX.Element {
        const { model, isLoading } = this.state;
        if (model == null && !isLoading) {
            this.getStatistics();
        }
        return <Grid container
            justify="center"
            alignItems="center">
            {isLoading && <CircularProgress size={80} />}
            {model != null && <MatchStatisticsComponent model={model} />}
        </Grid>;
    }

    private getStatistics = async () => {
        const { id } = this.props;
        if (id != null) {
            try {
                this.setState({ isLoading: true });
                const response = await matchApiCommands.getStatistics(id);
                this.setState({ isLoading: false, model: response.data });
            } catch (e) {
                this.setState({ isLoading: false });
            }
        }
    }
}

export const MatchStatisticsContainer = withStyles(styles)(MatchStatisticsContainerClass);
