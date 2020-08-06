import './App.css';

import React, { useState } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {
    blue,
    grey
} from "@material-ui/core/colors";

import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './app/components/Home';
import LanguageProvider from "./app/components/Languages";
import Login from './app/components/Login';
import Main from './app/Main';

function App() {
    const [darkState, setDarkState] = useState(false);
    const palletType = darkState ? "dark" : "light";

    const mainPrimaryColor = darkState ? grey[50] : blue[800];
    const mainSecondaryColor = darkState ? grey[800] : blue[800];
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
        }
    });

    const handleThemeChange = () => {
        setDarkState(!darkState);
    };

  return (
    <ThemeProvider theme={darkTheme}>
        <LanguageProvider>
            <CssBaseline/>
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/" exact={true}>
                            <Login />
                        </Route>
                        <Main handleTheme={handleThemeChange} darkState={darkState}>
                            <Route path="/home">
                                <Home />
                            </Route>
                        </Main>
                    </Switch>
                </div>
            </Router>
        </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
