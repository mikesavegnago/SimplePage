import './App.css';

import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import Home from './app/components/Home';
import Login from './app/components/Login';
import Main from './app/Main';
import React from 'react';

function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
            <Route path="/" exact={true}>
                <Login />
            </Route>
            <Main>
                <Route path="/home">
                    <Home/>
                </Route>
            </Main>
        </Switch>
    </div>
  </Router>
  );
}

export default App;
