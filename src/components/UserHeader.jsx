import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import PointsProgress from './profile/rewards/PointsProgress';

const UserHeader = () => {
const { user } = useAuth0();

  return (
    <AppBar position="static" sx={{ bgcolor: '#6547A5' }}>
      <Toolbar sx= {{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}} >
        <Typography variant="h7" component="div" sx={{ mt: 1 }}>
          {user ? `Hello, ${user.given_name}! Welcome back.` : 'Hello, InstaStaffer! Please login or register.'}
        </Typography>
        <PointsProgress />
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;

// import React from 'react';
// import { AppBar, Toolbar, Typography } from '@mui/material';
// import { useAuth0 } from '@auth0/auth0-react';
// import PointsProgress from './profile/rewards/PointsProgress';

// // const UserHeader = () => {
// //   const { user } = useAuth0();

// //   return (
// //     <AppBar position="static" sx={{ bgcolor: '#6547A5' }}>
// //       <Toolbar sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
// //         <Typography variant="h6" component="div" sx={{ mt: 1 }}>
// //           {user ? `Hello, ${user.given_name}! Welcome back.` : 'Hello, InstaStaffer! Please login or register.'}
// //         </Typography>
// //         {/* You may want to add a conditional rendering here if PointsProgress needs user info */}
// //         <PointsProgress />
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default UserHeader;
