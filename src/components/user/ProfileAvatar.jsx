import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '@mui/material';

const ProfileAvatar = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <div className="flex items-center">
      <Avatar alt={user.name} src={user.picture} sx={{ width: 48, height: 48 }} />
    </div>
  );
};

export default ProfileAvatar;
