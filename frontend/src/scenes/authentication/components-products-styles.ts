import { createStyles, Theme } from "@material-ui/core/styles";

export const AuthenticationContainerStyles = (theme: Theme) => createStyles({
    Container: {
        maxWidth: "5000px",
        margin: "8em auto 0",
        padding: "1em",
    },
    Center: {
        textAlign: "center",
        width: "100%"
    },
});