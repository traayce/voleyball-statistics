import * as React from "react";
import { Grid, Typography } from "@material-ui/core";

export class ContactsComponent extends React.PureComponent {
    public render(): JSX.Element {
        return <Grid container >
            <Typography>
                kontaktai
            </Typography>
        </Grid>;
    }
}
