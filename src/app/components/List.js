import {
    Avatar,
    Grid,
    Paper
} from '@material-ui/core';
import React, { useState } from 'react';

import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Checkbox from '@material-ui/core/Checkbox';
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
    }
  }));

function List(props) {
    const classes = useStyles();
    const data = props.data;
    const [hover, setHover] = useState(true);

    const onHover = () => {
        setHover(!hover);
    }

    return (
        <Paper elevation={1} className={classes.root} onMouseEnter={onHover} onMouseLeave={onHover}>
            <Grid container spacing={1}>
                <Grid key={1} item xs={2} sm={1}>
                    <div className={classes.owner}>
                        <div style={{display: hover ? 'block' : 'none'}}>
                            <Avatar>{data.owner}</Avatar>
                        </div>
                        <Checkbox
                            style={{display: !hover ? 'block' : 'none'}}
                            checked={false}
                        />
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
    );
}

export default withRouter(List);