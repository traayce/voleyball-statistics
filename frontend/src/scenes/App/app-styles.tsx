import { createStyles, Theme } from "@material-ui/core/styles";

export const AppContainerStyles = (theme: Theme) => createStyles({
    Root: {
        height: "100%",
        minWidth: "350px",
        [theme.breakpoints.up("md")]: {
            // marginTop: "4em"
        }
    }
});