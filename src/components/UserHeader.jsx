import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const UserHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Profile
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
