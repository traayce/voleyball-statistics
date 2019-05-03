
import * as React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
interface OwnProps {
    isOpen: boolean;
    onClose: React.MouseEventHandler;
    onSuccess: React.MouseEventHandler;
}

type Props = OwnProps;
class MatchPromptClass extends React.PureComponent<Props> {
    public render(): JSX.Element {
        const { onClose, isOpen, onSuccess } = this.props;
        return <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Ar esate tikri, kad norite baigti varžybas?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Paspaudus "Taip" statistikos keisti nebegalėsite.
          </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSuccess} color="primary">
                    Taip
          </Button>
                <Button onClick={onClose} color="primary" autoFocus>
                    Ne
          </Button>
            </DialogActions>
        </Dialog>;
    }
}

export const MatchPrompt = MatchPromptClass;