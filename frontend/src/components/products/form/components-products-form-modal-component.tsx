import * as React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";

interface Props {
    isOpen: boolean;
    handleClose(isConfirm: boolean): () => void;
}

export class ProductFormModalComponent extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { isOpen, handleClose } = this.props;
        return <Dialog
            open={isOpen}
            onClose={handleClose(false)}
        >
            <DialogTitle id="alert-dialog-title">{"Are You sure the price is correct?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm the specified price is correct.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose(true)} color="primary">
                    Yes, It Is Correct
              </Button>
                <Button onClick={handleClose(false)} color="primary" autoFocus>
                    No, I Want To Change It
              </Button>
            </DialogActions>
        </Dialog>;
    }
}
