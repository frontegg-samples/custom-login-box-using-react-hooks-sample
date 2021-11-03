import {Button} from "semantic-ui-react";
import React from "react";
import {useAuth, useAuthActions} from "@frontegg/react";
import {useHistory} from "react-router-dom";

function HomePage() {
    const { isAuthenticated } = useAuth();
    let history = useHistory();
    const actions = useAuthActions();

    return (
        <div>
        {isAuthenticated ?
                <Button onClick={() => actions.logout()}>Logout</Button> :
                <Button onClick={() => history.push('/account/login')}>Login</Button>}
        </div>
    )
}

export default HomePage;
