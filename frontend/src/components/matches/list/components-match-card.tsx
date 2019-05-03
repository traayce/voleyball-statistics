import * as React from "react";
import { Card, CardActionArea, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { MatchModel } from "src/types";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
    card: {
        margin: "auto",
        maxWidth: "95%",
        marginBottom: "10px"
    }
});
interface OwnProps {
    openEditor: (match: MatchModel) => React.MouseEventHandler;
    match: MatchModel;
}
type Props = OwnProps & WithStyles<typeof styles>;
class MatchCardClass extends React.Component<Props> {
    public render(): JSX.Element {
        const { openEditor, match, classes } = this.props;
        return <Card className={classes.card} key={match.id}>
            <CardActionArea onClick={openEditor(match)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Varžybos {match.teamA.name} - {match.teamB.name}
                    </Typography>
                    <Typography component="p">
                        Vieta: {match.location}
                        Laikas: {match.startsAt}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={openEditor(match)}>
                    Peržiūrėti
        </Button>
            </CardActions>
        </Card>;
    }
}
export const MatchCardComponent = withStyles(styles)(MatchCardClass);