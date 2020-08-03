import {
    AppBar,
    Avatar,
    Button,
    Collapse,
    Divider,
    Drawer,
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
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
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
    padding: theme.spacing(10, 5, 5, 5),
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [listMenu, setListMenu] = useState([]);

    useEffect(() => {
        fetch("http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/menus")
            .then(results => results.json())
            .then(results => setListMenu(results));
    }, []);


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
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickAvatar} style={{float: 'left', marginTop: '3px'}}>
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
                    <>
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
                                onClick={() => handleChangeBody(submenu.id)}>
                                <ListItemIcon>
                                    <ArrowRightIcon />
                                </ListItemIcon>
                                <ListItemText primary={submenu.name} />
                            </ListItem>
                        ))}
                        </List>
                    </Collapse>
                    </>
                ))}
                </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                <span>exp</span>
                </IconButton>
                Home
            </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
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
                <Hidden xsDown implementation="css">
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