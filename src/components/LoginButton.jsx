
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

// import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';

// const LoginButton = () => {
//   const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();

//   const userLogout = async () => {
//     const userId = window.sessionStorage.getItem('userId');
//     if (userId) {
//       try {
//         const accessToken = await getAccessTokenSilently();
//         await fetch(`/user/${userId}`, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         console.log('User deleted successfully');
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }

//     window.sessionStorage.removeItem('userId');
//     logout({ returnTo: window.location.origin });
//   };

//   return (
//     <div>
//       {!isAuthenticated && (
//         <button
//           className='bg-[#6547A5] hover:bg-[#7D67AC] text-white py-2.5 px-4 border-[#24233E] hover:border-transparent rounded'
//           onClick={() => loginWithRedirect({ returnTo: window.location.origin })}
//         >
//           Login
//         </button>
//       )}
//       {isAuthenticated && (
//         <button
//           className='bg-[#6547A5] hover:bg-[#7D67AC] text-white py-2.5 px-4 border-[#24233E] hover:border-transparent rounded'
//           onClick={userLogout}>
//           Logout
//         </button>
//       )}
//     </div>
//   );
// };

// export default LoginButton;
