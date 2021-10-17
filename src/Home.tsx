import {Button} from "semantic-ui-react";
import React from "react";
import {useAuth} from "@frontegg/react";
import {useHistory} from "react-router-dom";

function HomePage() {
    const { isAuthenticated } = useAuth();
    let history = useHistory();

    return (
        <div>
        {isAuthenticated ?
                <Button>Logout</Button> :
                <Button onClick={() => history.push('/login')}>Login</Button>}
        </div>
    )
}

export default HomePage;
