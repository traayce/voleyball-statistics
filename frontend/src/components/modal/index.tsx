
import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, createStyles, withStyles, WithStyles } from "@material-ui/core";
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
type Props = OwnProps & WithStyles<typeof styles>;
class ModalComponentClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { isOpen, onClose, contextText, buttonActions, title, classes } = this.props;
        return <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth={true}
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

export const ModalComponent = withStyles(styles)(ModalComponentClass);