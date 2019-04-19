import { createStyles, Theme } from "@material-ui/core/styles";

export const ProductsContainerStyles = (theme: Theme) => createStyles({
    Container: {
        maxWidth: "1000px",
        margin: "1em auto 0",
        padding: "1em",
        flexGgrow: 1,
        minHeight: "400px",
        paddingBottom: "2em",
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