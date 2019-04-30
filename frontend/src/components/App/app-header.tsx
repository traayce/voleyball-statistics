import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Grid, CssBaseline } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { createStyles, WithStyles, withStyles, Theme } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { NavigationComponent } from "./app-menu";
import { withRouter, RouteComponentProps } from "react-router";
const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
});

interface OwnProps {
    isAuthenticated: boolean;
}

type Props = OwnProps & WithStyles<typeof styles> & RouteComponentProps;

interface State {
    anchorEl: HTMLElement | null;
    isNavigationMenuOpen: boolean;
}

class HeaderComponentClass extends React.Component<Props, State> {
    public state: State = {
        anchorEl: null,
        isNavigationMenuOpen: false
    };

    private handleUserMenu: React.MouseEventHandler<HTMLElement> = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

    private handleUserMenuClose: React.MouseEventHandler<HTMLElement> = () => {
        this.setState({ anchorEl: null });
    }

    private toggleMenu: React.MouseEventHandler<HTMLElement> = () => {
        this.setState(state => ({ isNavigationMenuOpen: !state.isNavigationMenuOpen }));
    }

    public render(): JSX.Element | null {
        const { classes, isAuthenticated } = this.props;
        const { anchorEl, isNavigationMenuOpen } = this.state;
        console.log(this.props.location.pathname);
        if (this.props.location.pathname.includes("/matches/") && !this.props.location.pathname.includes("/setup")) {
            return null;
        }
        const open = Boolean(anchorEl);
        return <Grid>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        voleyball-statistics
          </Typography>
                    {isAuthenticated && (
                        <Grid>
                            <IconButton
                                aria-owns={open ? "menu-appbar" : undefined}
                                aria-haspopup="true"
                                onClick={this.handleUserMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={this.handleUserMenuClose}
                            >
                                <MenuItem onClick={this.handleUserMenuClose}>Profilis</MenuItem>
                                <MenuItem onClick={this.handleUserMenuClose}>Atsijungti</MenuItem>
                            </Menu>
                        </Grid>
                    )}
                </Toolbar>
                <NavigationComponent
                    isAuthenticated={isAuthenticated}
                    isMenuOpen={isNavigationMenuOpen}
                    toggle={this.toggleMenu} />
            </AppBar>
        </Grid>;
    }
}

export const HeaderComponent = withRouter(withStyles(styles)(HeaderComponentClass));