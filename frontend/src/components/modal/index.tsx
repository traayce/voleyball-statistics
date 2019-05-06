
import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
interface OwnProps {
    isOpen: boolean;
    contextText?: string;
    title?: string;
    onClose: React.MouseEventHandler;
    buttonActions: JSX.Element[];
}

type Props = OwnProps;
class ModalComponentClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { isOpen, onClose, contextText, buttonActions, title } = this.props;
        return <Dialog
            open={isOpen}
            onClose={onClose}
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

export const ModalComponent = ModalComponentClass;