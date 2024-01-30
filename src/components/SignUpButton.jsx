import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = () => {
  const { loginWithRedirect, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  // Function to handle sign up
  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams: { screen_hint: 'signup' }
    });
  };

  // Function to send user data to backend
  const sendUserDataToBackend = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const userData = {
        first_name: user.given_name,
        last_name: user.family_name,
        email: user.email,
        token: accessToken
      };

      console.log(userData);

      const response = await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 409) {
        // Email already in use
        alert('Email already in use. Please log in or use a different email.');
      } else if (!response.ok) {
        throw new Error('Failed to send user data to backend');
      }
    } catch (error) {
      console.error('Error sending user data to backend:', error);
    }
  };

  // Effect to send user data to backend after successful authentication
  useEffect(() => {
    if (isAuthenticated) {
      sendUserDataToBackend();
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  // Render the Sign Up button only if the user is not authenticated
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
