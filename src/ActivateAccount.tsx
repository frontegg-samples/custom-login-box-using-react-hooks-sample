import {useAuthActions} from "@frontegg/react";
import {useState} from "react";
import {Button, Input} from "semantic-ui-react";
import {useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ActivateAccountPage(){
    let query = useQuery();
    const actions = useAuthActions();
    const [password, setPassword] = useState('');

    const userId = query.get('userId') || '';
    const token = query.get('token') || '';

    const handleActivateAccount = () => {
        actions.activateAccount({
            userId, // This is what we get from the query params
            token, // This is what we get from the query params
            password, // User inputs
        });
    }


    const handlePasswordChange = (e: any, data: any) => {
        setPassword(data.value);
    }

    return (
        <div>
            <Input size={"large"}
                   iconPosition='left'
                   type="password"
                   onChange={handlePasswordChange}
                   placeholder='Password' />

            <Button onClick={handleActivateAccount}>Activate account</Button>
        </div>
    )
}


export default ActivateAccountPage;

