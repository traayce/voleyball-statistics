import * as React from "react";
import { ProductsContainerStyles } from "./components-products-styles";
import { WithStyles, Paper, withStyles } from "@material-ui/core";

class AuthenticationContainerClass extends React.PureComponent<WithStyles<typeof ProductsContainerStyles>> {
    public render(): JSX.Element {
        const { classes } = this.props;
        return <Paper className={classes.Container}>
            <div>helloas1ssasafd5</div>
        </Paper>;
    }
}
export const AuthenticationContainer = withStyles(ProductsContainerStyles)(AuthenticationContainerClass);