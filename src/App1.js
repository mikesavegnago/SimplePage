<Paper elevation={1} className={classes.root}>
    <Grid container spacing={1}>
        <Grid key={1} item xs={2} sm={1}>
            <div className={classes.owner}>
                <Avatar>{data.owner}</Avatar>
            </div>
        </Grid>
        <Grid key={2} item xs={7} sm={9}>
            <div className={classes.lines}>{data.name}</div>
            <div className={classes.lines}>{data.subject}</div>
            <div className={classes.lines}>Caixa de entrada</div>
        </Grid>
        <Grid key={3} item xs={3} sm={2}>
            <div className={classes.lines}>Hoje, 11:00</div>
            <div className={classes.lines}>-2 horas</div>
            <div className={classes.lines}>
            <AvatarGroup max={4}>
                {data.users && data.users.map((user) => (
                    <Avatar className={classes.users}>{user}</Avatar>
                ))}

            </AvatarGroup>
            </div>
        </Grid>
    </Grid>
</Paper>

import {
    Avatar,
    Grid,
    Paper
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    users: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        fontSize: theme.spacing(2)
    },
    owner: {
        textAlign: 'center',
        padding: theme.spacing(2)
    },
    lines: {
        padding: theme.spacing(0.1)
    },
  }));

function List(props) {
    const classes = useStyles();
    const data = props.data;
    const [selected, setSelected] = React.useState([]);


    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const isItemSelected = isSelected(data.name);
    const labelId = `enhanced-table-checkbox-${props.index}`;

    return (
        <TableRow
            hover
            onClick={(event) => handleClick(event, data.name)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={data.name}
            selected={isItemSelected}
        >
            <TableCell padding="checkbox">
            <Checkbox
                checked={isItemSelected}
                inputProps={{ 'aria-labelledby': labelId }}
            />
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {data.name}
            </TableCell>
        </TableRow>
    );
}

export default withRouter(List);