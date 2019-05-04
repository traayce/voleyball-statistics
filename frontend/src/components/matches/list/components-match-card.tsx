import * as React from "react";
import { Card, CardActionArea, CardContent, Typography, CardActions, Button, Grid } from "@material-ui/core";
import People from "@material-ui/icons/People";
import { MatchModel } from "src/types";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import moment = require("moment");

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
        const time = moment(match.startsAt).format("YYYY/MM/DD HH:mm");
        return <Card className={classes.card} key={match.id}>
            <CardActionArea onClick={openEditor(match)}>
                <CardContent>
                    <Grid container direction="column" justify="center" xs={12}>
                        <Grid container xs={12} justify="center">
                            <Typography component="h4" variant="caption">
                                {time}
                            </Typography>
                        </Grid>
                        <Grid container xs={12} justify="center">
                            <Typography component="h4" variant="caption">
                                {match.location}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        xs={12}>
                        <Grid container xs={6}
                            justify="center">
                            <Grid container xs={12} justify="center" >
                                <People fontSize="large" />
                            </Grid>
                            <Typography gutterBottom variant="h5" component="h2">
                                {match.teamA.name}  ({match.pointsSummary.teamASetPoints})
                    </Typography>
                        </Grid>
                        <Grid container xs={6}
                            justify="center">
                            <Grid container xs={12} justify="center" >
                                <People fontSize="large" />
                            </Grid>
                            <Typography gutterBottom variant="h5" component="h2">
                                {match.teamB.name}  ({match.pointsSummary.teamBSetPoints})
                    </Typography>
                        </Grid>
                    </Grid>
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