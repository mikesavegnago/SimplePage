import React, {useEffect, useState} from 'react';

import List from './List';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  }));

function Home(props) {
    const [listBody, setListBody] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        (props.location.state && props.location.state.id) ?
            fetch("http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/items/" + props.location.state.id)
            .then(results => results.json())
            .then(results => setListBody(results))
        : setListBody([]);
    }, [props.location.state]);

    return (
        <div>
            {listBody.subMenuItems && listBody.subMenuItems.map((menu, i) => (
                <List data={menu} index={i} />
            ))}
        </div>

    );
}

export default withRouter(Home);