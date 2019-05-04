import { createStyles, Theme } from "@material-ui/core/styles";

export const MatchesContainerStyles = (theme: Theme) => createStyles({
    Container: {
        margin: "1em auto 0",
    },
    TextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "50%"
      },
      Button: {
          minWidth: "30%",
          margin: "5px"
      },
      Center: {
          textAlign: "center",
          width: "100%"
      },
      Alert: {
        display: "inline-flex",
        padding: "20px",
        backgroundColor: "#f44336",
        color: "white",
        maxWidth: "50%"
      },
      card: {
          margin: "auto",
        maxWidth: "50%",
        marginBottom: "10px"
      },
      media: {
        height: 140,
      },
});