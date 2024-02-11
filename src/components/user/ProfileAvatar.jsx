import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfileAvatar = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;

  const avatarContent = user.picture ? (
    <Avatar alt={user.name} src={user.picture} sx={{ width: 48, height: 48 }} />
  ) : (
    <Avatar sx={{ width: 48, height: 48 }}>
      <AccountCircleIcon sx={{ color: "#C0ABF4" }} />
    </Avatar>
  );

  return <div className="flex items-center mr-4">{avatarContent}</div>;
};
export default ProfileAvatar;
