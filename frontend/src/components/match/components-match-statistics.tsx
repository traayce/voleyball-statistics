import * as React from "react";
import { MatchStatisticsModel, MatchTeamStatisticsModel } from "src/types";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, Stepper, Step, StepLabel, StepContent, Typography, Button, Tabs, Tab, Paper } from "@material-ui/core";

const styles = () => createStyles({
    CellPadding: {
        padding: 0
    }
});

interface OwnProps {
    model: MatchStatisticsModel;
}

interface State {
    setSelected: number;
}
type Props = OwnProps & WithStyles<typeof styles>;
class MatchStatisticsComponentClass extends React.Component<Props, State> {
    public state: State = {
        setSelected: 0
    };
    public render(): JSX.Element | null {
        const { model, classes } = this.props;
        if (model == null)
            return null;
        return <Grid container
            alignContent="center"
            justify="center">
            <Typography variant="h6" align="center">STATISTIKA</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.CellPadding}></TableCell>
                        {model.sets.map((x, index) => <TableCell align="right" className={classes.CellPadding}>{index + 1}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row" className={classes.CellPadding}>
                            {model.matchTeamA.name}
                        </TableCell>
                        {model.sets.map(x => <TableCell align="right" className={classes.CellPadding}>{x.aPoints}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" className={classes.CellPadding}>
                            {model.matchTeamB.name}
                        </TableCell>
                        {model.sets.map(x => <TableCell align="right" className={classes.CellPadding}>{x.bPoints}</TableCell>)}
                    </TableRow>
                </TableBody>
            </Table>
            <Typography variant="h6" align="center">ŽAIDĖJŲ STATISTIKA</Typography>
            {this.renderPlayersTable(model.matchTeamA)}
            {this.renderPlayersTable(model.matchTeamB)}
            <Typography variant="h6" align="center">LENTELĖS PAAIŠKINIMAI</Typography>
            {this.getStatisticsLegend()}
            <Typography variant="h6" align="center">ĮVYKIAI PAGAL SETUS</Typography>
            <Tabs
                value={this.state.setSelected}
                onChange={this.handleSetChande}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
            >
                {model.sets.map((x, index) => <Tab label={`${index + 1}`} style={{ width: `${100 / model.sets.length}%` }} />)}
            </Tabs>
            <Stepper orientation="vertical" >
                {model.sets[this.state.setSelected].setSteps.map((setAction, index) => (
                    <Step key={setAction.pointNumber} active>
                        <StepLabel>{setAction.teamAction}</StepLabel>
                        <StepContent>
                            {setAction.playerActions.map(x => <Typography>{x}</Typography>)}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Grid>;
    }

    private handleSetChande: (event: React.ChangeEvent<{}>, value: any) => void = (e, value) => {
        this.setState({ setSelected: value });
    }

    private renderPlayersTable = (team: MatchTeamStatisticsModel): JSX.Element => {
        const { classes } = this.props;
        return <Table>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.CellPadding} component="th">{team.name}</TableCell>
                    <TableCell className={classes.CellPadding} component="th" align="center">Ta</TableCell>
                    <TableCell className={classes.CellPadding} component="th" align="center">Kl</TableCell>
                    <TableCell className={classes.CellPadding} component="th" align="center">AS</TableCell>
                    <TableCell className={classes.CellPadding} component="th" align="center">Bl</TableCell>
                    <TableCell className={classes.CellPadding} component="th" align="center">NP</TableCell>
                    <TableCell className={classes.CellPadding} component="th" align="center">GK</TableCell>
                    <TableCell className={classes.CellPadding} component="th" align="center">RK</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {team.playerStatistics.map(x => <TableRow>
                    <TableCell className={classes.CellPadding} style={{ width: "20%" }}>
                        <Typography style={{ fontWeight: "bolder" }}>{x.playerName} - {x.number}</Typography>
                    </TableCell>
                    <TableCell align="center" className={classes.CellPadding}>{x.points}</TableCell>
                    <TableCell align="center" className={classes.CellPadding}>{x.turnovers}</TableCell>
                    <TableCell align="center" className={classes.CellPadding}>{x.assists}</TableCell>
                    <TableCell align="center" className={classes.CellPadding}>{x.blocks}</TableCell>
                    <TableCell align="center" className={classes.CellPadding}>{x.aces}</TableCell>
                    <TableCell align="center" className={classes.CellPadding}>{x.cardYellows}</TableCell>
                    <TableCell align="center" className={classes.CellPadding}>{x.cardReds}</TableCell>
                </TableRow>)}
            </TableBody>
        </Table>;
    }

    private getStatisticsLegend = () => <Grid container alignItems="center">
        <Grid item xs={12}><Typography variant="body1" align="center">Ta - Taškai</Typography></Grid>
        <Grid item xs={12}><Typography variant="body1" align="center">Kl - Klaidos</Typography></Grid>
        <Grid item xs={12}>
            <Typography variant="body1" align="center">AS - Asistuoti smūgiai</Typography></Grid>
        <Grid item xs={12}><Typography variant="body1" align="center">Bl - Blokai</Typography></Grid>
        <Grid item xs={12}><Typography variant="body1" align="center">NP - Neatriamemi padavimai</Typography></Grid>
        <Grid item xs={12}><Typography variant="body1" align="center">GK - Geltonos kortelės</Typography></Grid>
        <Grid item xs={12}><Typography variant="body1" align="center">RK - Raudonos kortelės</Typography></Grid>
    </Grid>;

}

export const MatchStatisticsComponent = withStyles(styles)(MatchStatisticsComponentClass);
