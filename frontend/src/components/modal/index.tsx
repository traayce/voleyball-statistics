
import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, createStyles, withStyles, WithStyles, withWidth } from "@material-ui/core";
import { isWidthDown, WithWidth } from "@material-ui/core/withWidth";
interface OwnProps {
    isOpen: boolean;
    contextText?: string;
    title?: string;
    onClose: React.MouseEventHandler;
    buttonActions: JSX.Element[];
}
const styles = () => createStyles({
    Container: {
        width: "50%"
    }
});
type Props = OwnProps & WithStyles<typeof styles> & WithWidth;
class ModalComponentClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { isOpen, onClose, contextText, buttonActions, title, classes } = this.props;
        return <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth={true}
            fullScreen={isWidthDown("xs", this.props.width)}
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {contextText}
                </DialogContentText>
                {this.props.children}
            </DialogContent>
            <DialogActions>
                {buttonActions}
            </DialogActions>
        </Dialog>;
    }
}

export const ModalComponent = withWidth()(withStyles(styles)(ModalComponentClass));