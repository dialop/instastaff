import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Popover } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileBookmark from './ProfileBookmark'; // Ensure the path is correct

const ProfileAvatar = () => {
  const { user, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const [twinkle, setTwinkle] = useState(true); // State to manage twinkle effect

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setTwinkle(false); // Turn off twinkle effect once avatar is clicked
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (!isAuthenticated) return null;

  // Conditionally apply the twinkle animation class based on the twinkle state
  const avatarClass = `h-12 w-12 rounded-full cursor-pointer ${twinkle ? 'animate-twinkle' : ''}`;

  return (
    <div className="flex items-center mr-4">
      {user.picture ? (
        <img
          className={avatarClass}
          src={user.picture}
          alt={user.name}
          onClick={handleClick}
        />
      ) : (
        <div
          className={`${avatarClass} flex justify-center items-center bg-gray-200`}
          onClick={handleClick}
        >
          <AccountCircleIcon style={{ color: "#C0ABF4" }} />
        </div>
      )}
      <Popover
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
