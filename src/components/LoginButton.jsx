import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const userLogout = () => {
    window.sessionStorage.removeItem('userId')
    logout({ returnTo: window.location.origin })
  }

  return (
    <div>
      {!isAuthenticated && (
        <button
          className='bg-[#6547A5] hover:bg-[#7D67AC] text-white py-2.5 px-4 border-[#24233E] hover:border-transparent rounded'
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
      )}
      {isAuthenticated && (
        <button
          className='bg-[#6547A5] hover:bg-[#7D67AC] text-white py-2.5 px-4 border-[#24233E] hover:border-transparent rounded'
          onClick={userLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default LoginButton;

