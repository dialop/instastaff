import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Popover } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileBookmark from './ProfileBookmark'; // Make sure this path is correct
import { useRegistration } from '../../context/RegistrationContext'; // Adjust the import path as necessary

const ProfileAvatar = () => {
  const { user, isAuthenticated } = useAuth0();
  const { isRegistered } = useRegistration();
  const [anchorEl, setAnchorEl] = useState(null);

  // Initially set twinkle effect based on registration status
  const [twinkle, setTwinkle] = useState(isAuthenticated && isRegistered);

  useEffect(() => {
    // Update twinkle effect when registration status changes, but only if authenticated
    if (isAuthenticated) {
      setTwinkle(isRegistered);
    }
  }, [isAuthenticated, isRegistered]);

  const handleClick = (event) => {
    setTwinkle(false);
    if (isRegistered) {
      // Only set anchorEl (to show the popover) if the user is registered
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    // You might consider whether to disable the twinkle effect here or leave it as a constant visual cue
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Render the avatar if authenticated, but twinkle only if also registered
  if (!isAuthenticated) return null; // Show nothing if not authenticated

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
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
      >
        <ProfileBookmark />
      </Popover>
    </div>
  );
};

export default ProfileAvatar;
