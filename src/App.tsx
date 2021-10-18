import React from 'react';
import './App.css';

import {
    Switch,
    Route,
} from 'react-router-dom';
import LoginPage from "./Login";
import HomePage from './Home';
import ActivateAccountPage from "./ActivateAccount";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/activate">
                    <ActivateAccountPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
