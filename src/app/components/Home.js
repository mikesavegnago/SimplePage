import {
    Button,
} from '@material-ui/core';
import React from 'react';
import { withRouter } from "react-router-dom";

function Home(props) {

    const handleLogout = () => {
        localStorage.setItem('@simple-page/autenticated', false);
        props.history.push('/');
    }
    return (
        <div>
            Home page content
            <br />
            <Button
                variant="contained"
                size="large"
                onClick={() => handleLogout()}
            >
            Logout
            </Button>
        </div>
    );
}

export default withRouter(Home);