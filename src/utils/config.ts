import { Amplify, ResourcesConfig } from 'aws-amplify';


const authConfig: ResourcesConfig["Auth"] = {
    Cognito: {
        userPoolId: 'ap-southeast-1_3UcFb8IAS',
        userPoolClientId: '7d945a5dsb3lm65an80ck7tmim',
        loginWith : {
            oauth : {
                // login with google
                domain : 'https://auth.google.com',
                scopes : ['email', 'openid', 'profile'],
                redirectSignIn : ['http://localhost:3000'],
                redirectSignOut : ['http://localhost:3000'],
                responseType: 'code',
            }
        }
    }
}
Amplify.configure({
    Auth: authConfig
});