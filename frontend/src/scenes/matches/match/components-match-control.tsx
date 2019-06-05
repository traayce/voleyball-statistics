
import * as React from "react";
import { createStyles, WithStyles, withStyles, Button, Theme } from "@material-ui/core";
const styles = (theme: Theme) => createStyles({
    Green: {
        backgroundColor: "green"
    },
    Button: {
        margin: theme.spacing.unit,
        width: "13%",
        marginTop: 0,
        marginBottom: 0
    }
});

interface OwnProps {
    actionName: string;
    isSelected?: boolean;
    onClick?: React.MouseEventHandler;
    disabled: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;
class MatchControlClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { classes, actionName, onClick, disabled } = this.props;
        return <Button variant="contained" color="primary" className={classes.Button} onClick={onClick} disabled={disabled}>
            {actionName}
        </Button>;
    }
}

export const MatchControl = withStyles(styles)(MatchControlClass);