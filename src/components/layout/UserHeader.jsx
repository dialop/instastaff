import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useAdmin } from '../../context/AdminContext';
import PointsHBar from '../profile/rewards/PointsHBar';

const UserHeader = () => {
  const { user } = useAuth0();
  const { isAdmin } = useAdmin();

  return (
    <AppBar position="static" sx={{ bgcolor: '#6547A5' }}>
      <Toolbar sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ mt: 1 }}>
          {user ? (
            isAdmin ? `Hello, Admin! How can we staff you today?` : `Hello, ${user.given_name || 'InstaStaffer'}! How can we staff you today?`
          ) : 'Hello, InstaStaffer! Please login or register.'}
        </Typography>
        {!isAdmin && <PointsHBar />}
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
