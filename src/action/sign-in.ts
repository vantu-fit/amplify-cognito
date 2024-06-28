import { SignInOutput, autoSignIn } from 'aws-amplify/auth';
import { signIn, type SignInInput } from 'aws-amplify/auth';

async function handleSignIn({ username, password }: SignInInput) : Promise<SignInOutput> {
  return new Promise((resolve, rejects) => {
    signIn({ username, password })
      .then((signInOutput) => {
        resolve(signInOutput);
      })
      .catch((error) => {
        rejects(error);
      });
  })
}


async function handleAutoSignIn(): Promise<SignInOutput> {
  return new Promise((resolve, rejects) => {
    autoSignIn()
      .then((signInOutput) => {
        resolve(signInOutput);
      })
      .catch((error) => {
        rejects(error);
      });
  })
}

export { handleSignIn, handleAutoSignIn };