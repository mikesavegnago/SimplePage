import {
    AppBar,
    Avatar,
    Button,
    Collapse,
    Divider,
    Drawer,
    Grid,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { languages, useLanguages } from "./components/Languages";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from "@material-ui/core/Switch";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  content: {
    textAlign: 'left',
    width: '100%',
    padding: theme.spacing(9.5, 0, 0, 0),
  },
}));

function Main(props) {
    const autenticated = localStorage.getItem('@simple-page/autenticated');

    if (autenticated === 'false') {
        props.history.push('/');
    }

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const { language, setLanguage } = useLanguages();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorLang, setAnchorLang] = useState(null);
    const [listMenu, setListMenu] = useState([]);

    const handleThemeChange = () => {
        props.handleTheme();
    };

    useEffect(() => {
        fetch("http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/menus")
            .then(results => results.json())
            .then(results => setListMenu(results));
    }, []);

    const handleClickLang = (event) => {
        setAnchorLang(event.currentTarget);
    };

    const handleCloseLang = () => {
        setAnchorLang(null);
    };

    const handleClickAvatar = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseAvatar = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.setItem('@simple-page/autenticated', false);
        props.history.push('/');
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChangeBody = (id) => {
        props.history.push({ state: { id: id }})
    };

    const handleClick = (i) => {
        listMenu[i]['open'] = !listMenu[i]['open'];
        setListMenu([...listMenu])
    };

    const drawer = (
        <div>
            <div className={classes.toolbar}>
                <Button
                    onClick={handleClickAvatar}
                    style={{float: 'left', marginTop: '3px'}}
                >
                    <Avatar>OA</Avatar>
                </Button>
                <Menu
                    id="simple-menu"
                    key="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseAvatar}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
            <Divider />
                <List component="nav" key="menu">
                {listMenu && listMenu.map((menu, i) => (
                    <div key={menu.id + "div"}>
                        <ListItem button onClick={() => handleClick(i)} key={menu.id}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={menu.name} />
                            {(menu.open || false) ? <ExpandLess /> : <ExpandMore />  }
                        </ListItem>
                        <Collapse in={(menu.open || false)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                            {menu.subMenus.map((submenu, j) => (
                                <ListItem
                                    button
                                    key={submenu.id + "sub"}
                                    className={classes.nested}
                                    onClick={() => handleChangeBody(submenu.id)}
                                >
                                    <ListItemIcon>
                                        <ArrowRightIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={submenu.name} />
                                </ListItem>
                            ))}
                            </List>
                        </Collapse>
                    </div>
                ))}
                </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Grid container>
                    <Grid item xs={10} sm={10} style={{textAlign: 'left'}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                            <p>{language.title}</p>
                    </Grid>
                    <Grid item xs={2} sm={2} style={{textAlign: 'right'}}>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClickLang}
                            style={{float: 'right', marginTop: '3px'}}
                        >
                            <LanguageIcon />
                        </Button>
                        <Menu
                            id="language"
                            key="language"
                            anchorEl={anchorLang}
                            keepMounted
                            open={Boolean(anchorLang)}
                            onClose={handleCloseLang}
                        >
                            <MenuItem onClick={() => setLanguage(languages.ptBR)}>pt-BR</MenuItem>
                            <MenuItem onClick={() => setLanguage(languages.en)}>en</MenuItem>
                        </Menu>
                        <Switch checked={props.darkState} onChange={handleThemeChange} />
                    </Grid>
                </Grid>
            </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden xlUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                    {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                    {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                {props.children}
            </main>
        </div>
    );
}

export default withRouter(Main);