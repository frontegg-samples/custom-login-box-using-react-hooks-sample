import {useSocialLoginActions, useSocialLoginState} from "@frontegg/react";
import {useEffect} from "react";
import {Button, Divider, Loader} from "semantic-ui-react";
import {ISocialLoginProviderConfiguration, SocialLoginProviders} from "@frontegg/rest-api";
import {useHistory} from "react-router-dom";

declare interface SocialLoginProps {
    clientId: string;
    redirectUrl: string;
    state: string;
}

const createGoogleUrl = ({ clientId, redirectUrl, state }: SocialLoginProps): string => {
    const searchParams: URLSearchParams = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUrl,
        response_type: 'code',
        include_granted_scopes: 'true',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        state,
    });
    const url: URL = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.search = searchParams.toString();
    return url.toString();
};

const GoogleButton = (config: SocialLoginProps) => {
    const url = createGoogleUrl(config);

    return <div>
        <Button onClick={() => window.location.href = url}>Google</Button>
    </div>
}

function createSocialLoginButton(config: ISocialLoginProviderConfiguration) {
    const redirectUrl = `${window.origin}/account/social/success`;
    console.log("redirectUrl - ", redirectUrl);
    switch (config.type) {
        case SocialLoginProviders.Google:
            return <GoogleButton clientId={config.clientId} redirectUrl={redirectUrl} state={''} />
    }
}

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

    console.log('socialLoginsConfig = ', socialLoginsConfig);

    return (
        <div>
            <Divider />
            {socialLoginsConfig.map((l) => {
                return createSocialLoginButton(l);
            })}
        </div>
    )
}

export default SocialLoginsWrapper;
