import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import PointsProgress from './profile/rewards/PointsProgress';

const UserHeader = () => {
const { user } = useAuth0();

  return (
    <AppBar position="static" sx={{ bgcolor: '#6547A5' }}>
      <Toolbar sx= {{ justifyContent: 'center'}}>
        <Typography variant="h7" component="div">
          {user ? `Hello, ${user.given_name}! Welcome back.` : 'Hello, InstaStaffer! Please login or register.'}
        </Typography>
        <PointsProgress />
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
