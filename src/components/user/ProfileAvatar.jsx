import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Popover, Tooltip, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileBookmark from './ProfileBookmark'; 
import { useRegistration } from '../../context/RegistrationContext'; 
import { useNavigate } from 'react-router-dom';

const ProfileAvatar = () => {
  const { user, isAuthenticated } = useAuth0();
  const { isRegistered } = useRegistration();
  const [anchorEl, setAnchorEl] = useState(null);
  const [twinkle, setTwinkle] = useState(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    setTwinkle(isAuthenticated);
  }, [isAuthenticated, isRegistered]);

  const handleClick = (event) => {
    if (isRegistered) {
      setTwinkle(false);
      setAnchorEl(anchorEl ? null : event.currentTarget);
    } else {
      navigate('/profile');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl) && isRegistered;

  if (!isAuthenticated) return null;

  const avatarContent = user.picture ? (
    <Avatar
      src={user.picture}
      alt={user.name}
      className={`h-12 w-12 rounded-full ${twinkle ? 'animate-twinkle' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    />
  ) : (
    <Avatar
      className={`h-12 w-12 rounded-full ${twinkle ? 'animate-twinkle' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer', color: "#C0ABF4", backgroundColor: "bg-gray-200" }}
    >
      <AccountCircleIcon />
    </Avatar>
  );

  return (
    <div className="flex items-center mr-4">
      <Tooltip 
        title={!isRegistered ? "Click me to be taken to registration. Complete the form!" : ""}
        arrow
        sx={{
          typography: 'body1',
          '& .MuiTooltip-tooltip': {
            color: 'white',
            fontSize: '5em',
          },
        }}
      >
        {avatarContent}
      </Tooltip>
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
