import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import { withRouter } from "react-router-dom";

function Home(props) {
    const [listBody, setListBody] = useState([]);

    useEffect(() => {
        (props.location.state && props.location.state.id) ? fetch("http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/items/" + props.location.state.id)
            .then(results => results.json())
            .then(results => setListBody(results))
        : setListBody([]);
    }, [props.location.state]);


    const handleLogout = () => {
        localStorage.setItem('@simple-page/autenticated', false);
        props.history.push('/');
    }
    return (
        <div>
            <List component="nav" key="menu">
                {listBody.subMenuItems && listBody.subMenuItems.map((menu, i) => (
                <ListItem button key={menu.id}>
                <ListItemText primary={menu.name} />
                </ListItem>
            ))}
            </List>
        </div>
    );
}

export default withRouter(Home);