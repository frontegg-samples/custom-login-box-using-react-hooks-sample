import React from 'react';
import './App.css';

import {
    Switch,
    Route,
} from 'react-router-dom';
import LoginPage from "./Login";
import HomePage from './Home';
import ActivateAccountPage from "./ActivateAccount";
import SocialLogins from "./SocialLogins";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/account/activate">
                    <ActivateAccountPage />
                </Route>
                <Route path="/account/login">
                    <LoginPage />
                </Route>
                {/*<Route path="/account/social/success">*/}
                {/*    <SocialLoginsCallbackPage />*/}
                {/*</Route>*/}
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
