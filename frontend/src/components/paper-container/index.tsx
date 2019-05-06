import * as React from "react";
import { WithStyles, Paper, withStyles, createStyles } from "@material-ui/core";

const styles = () => createStyles({
    Container: {
        width: "95%",
        margin: "1em auto 0",
        padding: "1em",
        flexGgrow: 1,
        minHeight: "400px",
        paddingBottom: "2em",
    }
});

class ContainerClass extends React.PureComponent<WithStyles<typeof styles>> {
    public render(): JSX.Element {
        const { classes } = this.props;
        return <Paper className={classes.Container}>
            {this.props.children}
        </Paper>;
    }
}
export const PaperContainer = withStyles(styles)(ContainerClass);