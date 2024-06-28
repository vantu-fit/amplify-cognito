import { signOut } from 'aws-amplify/auth';

async function handleSignOut() {
  return signOut();
}

export { handleSignOut };