import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Popover } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileBookmark from './ProfileBookmark'; // Ensure this path matches where your ProfileBookmark component is located

const ProfileAvatar = () => {
  const { user, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  if (!isAuthenticated) return null;

  const avatarStyle = {
    width: 48,
    height: 48,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8, // Change opacity on hover
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow effect on hover
    },
  };

  const avatarContent = user.picture ? (
    <Avatar
      alt={user.name}
      src={user.picture}
      sx={avatarStyle}
      onClick={handleClick}
    />
  ) : (
    <Avatar sx={avatarStyle} onClick={handleClick}>
      <AccountCircleIcon sx={{ color: "#C0ABF4" }} />
    </Avatar>
  );

  return (
    <div className="flex items-center mr-4">
      {avatarContent}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus
      >
        <ProfileBookmark />
      </Popover>
    </div>
  );
};

export default ProfileAvatar;
