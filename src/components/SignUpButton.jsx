import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams:{ screen_hint: 'signup' }
    });
  };

  // Render the button only if the user is not authenticated
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
