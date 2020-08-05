import {
    Button,
    Paper,
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import List from './List';
import { useLanguages } from "./Languages";
import { withRouter } from "react-router-dom";

function Home(props) {
    const [listBody, setListBody] = useState([]);
    const [haveChecked, setHaveChecked] = useState(false);
    const { language } = useLanguages();

    useEffect(() => {
        (props.location.state && props.location.state.id) ?
            fetch("http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/items/" + props.location.state.id)
            .then(results => results.json())
            .then(results => setListBody(results.subMenuItems))
        : setListBody([]);
    }, [props.location.state]);

    const handleChecked = (checked, i) => {
        listBody[i]['checked'] = checked;
        setListBody([...listBody])
    };

    const handleFile = () => {
        const newList = listBody.filter((elm) => elm.checked !== true);
        setListBody(newList)
    };

    useEffect(() => {
        const checked = listBody.find((elm) => elm.checked === true);
        setHaveChecked((checked ? true : false))
    }, [listBody]);

    return (
        <div>
            <Paper key="first-line">
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleFile}
                >
                    {language.fileBtn}
                </Button>
            </Paper>
            {listBody && listBody.map((menu, i) => (
                <List data={menu} index={i} key={i} handleChecked={handleChecked} havechecked={haveChecked} />
            ))}
        </div>

    );
}

export default withRouter(Home);