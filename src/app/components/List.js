import {
    Avatar,
    Grid,
    Paper
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { lightBlue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useLanguages } from "./Languages";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        "&:hover" : {
            '& $avatar': {
                display: 'none'
            },
            '& $checkbox': {
                display: 'block'
            },
        },
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        height: theme.spacing(12),
    },
    rootChecked: {
        '& $avatar': {
            display: 'none'
        },
        '& $checkbox': {
            display: 'block'
        },
        flexGrow: 1,
        paddingTop: theme.spacing(2),
        height: theme.spacing(12),
    },
    avatar: {
        display: 'block',
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    checkbox: {
        display: 'none',
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    users: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        fontSize: theme.spacing(1.5),
        color: '#666',
        backgroundColor: lightBlue[100]
    },
    owner: {
        textAlign: 'center',
        padding: theme.spacing(2)
    },
    lines: {
        padding: theme.spacing(0.1)
    },
    blue: {
        color: '#666',
        backgroundColor: lightBlue[100],
    },
  }));

function List(props) {
    const classes = useStyles();
    const data = props.data;
    const [haveChecked, setHaveChacked] = useState(false);
    const { language } = useLanguages();

    const handleChecked = (event) => {
      props.handleChecked(event.target.checked, props.index)
    };

    useEffect(() => {
        (haveChecked !== props.havechecked) && setHaveChacked(props.havechecked)
    }, [props.havechecked, haveChecked]);

    return (
        <Paper elevation={2} key={data.id + "paper"} className={haveChecked ? classes.rootChecked : classes.root}>
            <Grid container>
                <Grid item xs={2} sm={1}>
                    <div className={classes.owner}>
                        <div className={classes.avatar}>
                            <Avatar className={classes.blue}>{data.owner}</Avatar>
                        </div>
                        <Checkbox
                            className={classes.checkbox}
                            onChange={handleChecked}
                            color="primary"
                            checked={data.checked || false}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                </Grid>
                <Grid item xs={7} sm={9}>
                    <div className={classes.lines}>{data.name}</div>
                    <div className={classes.lines}>{data.subject}</div>
                    <div className={classes.lines}>{language.description}</div>
                </Grid>
                <Grid item xs={3} sm={2}>
                    <div className={classes.lines}>{language.date}, 11:00</div>
                    <div className={classes.lines}>-2 {language.hour}</div>
                    <div className={classes.lines}>
                    <AvatarGroup max={4}>
                        {data.users && data.users.map((user, i) => (
                            <Avatar key={data.id + "-" + i} className={classes.users}>{user}</Avatar>
                        ))}

                    </AvatarGroup>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default withRouter(List);