import { ConfirmSignUpOutput, SignUpOutput, signUp } from 'aws-amplify/auth';
import { confirmSignUp, type ConfirmSignUpInput } from 'aws-amplify/auth';


export type SignUpParameters = {
  name: string;
  password: string;
  email: string;
  phone_number?: string;
};

async function handleSignUp({
  name,
  password,
  email,
}: SignUpParameters): Promise<SignUpOutput> {
  return new Promise((resolve, rejects) => {
    signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name: name,
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    })
      .then(({ isSignUpComplete, userId, nextStep }) => {
        resolve({ isSignUpComplete, userId, nextStep });
      })
      .catch((error) => {
        rejects(error);
      });
  })

}

async function handleSignUpConfirmation({
  username,
  confirmationCode
}: ConfirmSignUpInput): Promise<ConfirmSignUpOutput> {
  return new Promise((resolve, rejects) => {
    confirmSignUp({
      username,
      confirmationCode
    })
      .then(({ isSignUpComplete, nextStep }) => {
        resolve({ isSignUpComplete, nextStep });
      })
      .catch((error) => {
        rejects(error);
      });
  })
}

export { handleSignUp, handleSignUpConfirmation };