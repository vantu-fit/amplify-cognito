import { Amplify, ResourcesConfig } from 'aws-amplify';


const authConfig: ResourcesConfig["Auth"] = {
    Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
        userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
        loginWith : {
            oauth : {
                // login with google
                domain : 'https://auth.google.com',
                scopes : ['email', 'openid', 'profile'],
                redirectSignIn : [process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN || 'http://localhost:3000'],
                redirectSignOut : [process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT || 'http://localhost:3000'],
                responseType: 'code',
            }
        }
    }
}
Amplify.configure({
    Auth: authConfig
});

export default function ConfigureAmplifyClientSide() {
  return null;
}