import {Button, Dimmer, Divider, Icon, Input, Loader} from 'semantic-ui-react'
import "./Login.css";
import {useAuth, useAuthActions, useSocialLoginActions, useSocialLoginState} from "@frontegg/react";
import { LoginStep } from '@frontegg/redux-store';
import {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

function SocialLoginsWrapper() {
    const {firstLoad, error, loading, socialLoginsConfig} = useSocialLoginState();

    const { loadSocialLoginsConfiguration } = useSocialLoginActions();
    useEffect(() => {
        if (firstLoad) {
            loadSocialLoginsConfiguration();
        }
    }, [loadSocialLoginsConfiguration, firstLoad]);

    if (error) {
        return <div className='fe-error-message'>{error}</div>;
    }

    if (firstLoad) {
        return <Loader/>;
    }

    if (!socialLoginsConfig?.length || !socialLoginsConfig.some(({ active }) => active)) {
        return null;
    }

    return (
        <div>
            <Divider />
            {socialLoginsConfig.map((l) => {
                return <Button>{l.type}</Button>
            })}
        </div>
    )
}

function LoginPage() {
    const { loginState, isAuthenticated, user } = useAuth();
    const actions = useAuthActions();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();



    console.log('user - ', user);
    console.log('loginState - ', loginState);
    console.log('isAuthenticated - ', isAuthenticated);

    if (isAuthenticated) {
        history.push('/');
    }

    const isPreLogin = () => {
        return loginState.step === LoginStep.preLogin;
    };

    const isLoginWithPassword = () => {
        return loginState.step === LoginStep.loginWithPassword;
    };

    const handleEmailChange = (e: any, data: any) => {
        setEmail(data.value);
    }

    const handlePasswordChange = (e: any, data: any) => {
        setPassword(data.value);
    }

    const handlePrelogin = () => {
        actions.preLogin({email});
    }

    const handleLoginWithPassword = () => {
        actions.login({ email, password });
    }

    return (
        <div>
            <div className="login-box">
                {loginState.loading && <Dimmer active>
                    <Loader />
                </Dimmer> }

                <Input size={"large"} iconPosition='left'
                       onChange={handleEmailChange}
                       placeholder='Email' required>
                    <Icon name='at' />
                    <input />
                </Input>
                {isLoginWithPassword() && <Input size={"large"}
                                                 iconPosition='left'
                                                 type="password"
                                                 onChange={handlePasswordChange}
                                                 placeholder='Password'>
                    <Icon name='key' />
                    <input />
                </Input>}

                {isPreLogin() && <Button onClick={handlePrelogin}>Continue</Button>}
                {isLoginWithPassword() && <Button onClick={handleLoginWithPassword}>Login</Button>}
                <SocialLoginsWrapper />
            </div>
        </div>
    )
}

export default LoginPage;
