import { useState, useEffect } from 'react';
import {  AuthError, AuthUser, getCurrentUser } from 'aws-amplify/auth';


const useCurrentUser = () => {
  const [user, setUser] = useState({} as AuthUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser({
          username: currentUser.username,
          userId: currentUser.userId,
          signInDetails: currentUser.signInDetails,
        });
      } catch (err : any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { user, loading, error };
};

export default useCurrentUser;
