import { createStyles, Theme } from "@material-ui/core/styles";

export const MatchesContainerStyles = (theme: Theme) => createStyles({
  Container: {
    width: "95%",
    margin: "1em auto 0",
    padding: "1em",
    flexGgrow: 1,
    minHeight: "350px",
    paddingBottom: "2em",
  },
  Player: {
    width: "85px",
    height: "85px",
    backgroundColor: "red",
    border: "5px solid black"
  },
  PlayerNumber: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    width: "100%",
    fontSize: "3em"
  },
  Map: {
    background: `url(${"/volleyball-court.svg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    width: "100%",
    height: "85%"
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