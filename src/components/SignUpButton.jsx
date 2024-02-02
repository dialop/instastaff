import React, { useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = () => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const handleSignUp = () => {
    loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
  };

  const sendUserDataToBackend = useCallback(async () => {
    if (user) {
      try {
        const accessToken = await getAccessTokenSilently();
        const userData = {
          first_name: user.given_name,
          last_name: user.family_name,
          email: user.email,
          profile_picture: user.picture,
          token: accessToken
        };

        console.log(userData);

        // do not hardcode
        const response = await fetch('/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Failed to send user data to backend');
        }
      } catch (error) {
        console.error('Error sending user data to backend:', error);
      }
    }
  }, [user, getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) {
      sendUserDataToBackend();
    }
  }, [isAuthenticated, sendUserDataToBackend]);

  return !isAuthenticated && (
    <button
      className='bg-transparent hover:bg-[#7D67AC] hover:text-white py-2 px-4 mr-2 border border-[#5b588a] hover:border-transparent rounded'
      onClick={handleSignUp}
    >
      Register
    </button>
  );
};

export default SignUpButton;
