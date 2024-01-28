import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className='bg-transparent hover:bg-[#7D67AC] hover:text-white py-2 px-4 mr-2 border border-[#5b588a] hover:border-transparent rounded'
      onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
    >
      Register
    </button>
  );
};

export default SignUpButton;
