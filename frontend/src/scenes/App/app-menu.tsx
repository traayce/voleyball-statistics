import * as React from "react";
import { Grid, Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import { createStyles, WithStyles, withStyles, Theme, WithTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    }
});

interface OwnProps {
    isAuthenticated: boolean;
    isMenuOpen: boolean;
    toggle: React.MouseEventHandler<HTMLElement>;
}

type Props = OwnProps & WithStyles<typeof styles> & WithTheme;

interface State {
    mobileOpen: boolean;
}

interface MenuItem {
    name: string;
    path: string;
}
const Paths: MenuItem[] = [
    { name: "Varžybos", path: "/matches" },
    { name: "Komandos", path: "/teams" },
    { name: "Prisijungimas", path: "/login" }];

class NavigationComponentClass extends React.Component<Props, State> {
    public state: State = {
        mobileOpen: false
    };

    private items = (toolbarClass: string) =>
        <div>
            <div className={toolbarClass} />
            <Divider />
            <List>
                {Paths.map((item, index) => (
                    <Link to={item.path}>
                        <ListItem button key={item.name} onClick={this.props.toggle}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            {/* <List>
                {["Administravimas"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <Link to={"/administration"}><ListItemText primary={"Administravimas"} /></Link>
                    </ListItem>
                ))}
            </List> */}
        </div>


    public render(): JSX.Element {
        const { classes, isMenuOpen, toggle } = this.props;
        return <Grid>
            <nav className={classes.drawer}>
                <SwipeableDrawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={isMenuOpen}
                    onClose={toggle}
                    onOpen={() => null}
                >
                    {this.items(classes.toolbar)}
                </SwipeableDrawer>
            </nav>
        </Grid>;
    }
}

export const NavigationComponent = withStyles(styles, { withTheme: true })(NavigationComponentClass);