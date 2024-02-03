import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, Avatar, Button, IconButton, Paper, Badge, TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit'; 
import BarChartComponent from './profile/BarChartComponent';
import Rewards from './profile/rewards/Rewards';
import GiftCard from './profile/rewards/GiftCard'; 
import PieChartInsentive from './profile/PieChartInsentive';
import { styled } from '@mui/material/styles';

// Define a styled Avatar component
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function ProfilePage() {
  // Define state to store API data
  const [setApiData] = useState([]); // Include 'setApiData' in the dependency array
  const [isEditMode, setIsEditMode] = useState(false); 
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || '');
  const [badgeAvatar, setBadgeAvatar] = useState(localStorage.getItem('badgeAvatar') || '/static/images/avatar/1.jpg');
  const defaultAvatar = '/path/to/default/avatar.jpg';

  useEffect(() => {
    const storedAvatar = localStorage.getItem('userAvatar');
    const storedBadgeAvatar = localStorage.getItem('badgeAvatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
    if (storedBadgeAvatar) {
      setBadgeAvatar(storedBadgeAvatar);
    }

    // API request when the component mounts
    fetch('s', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_CARDLY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [setApiData]);

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newAvatar = URL.createObjectURL(event.target.files[0]);
      setAvatar(newAvatar);
      localStorage.setItem('userAvatar', newAvatar);
    }
  };

  const handleBadgeAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newBadgeAvatar = URL.createObjectURL(event.target.files[0]);
      setBadgeAvatar(newBadgeAvatar);
      localStorage.setItem('badgeAvatar', newBadgeAvatar);
    }
  };

  const [userData, setUserData] = useState({
    name: 'Diana Lopez',
    title: 'Registered Nurse, RN',
    location: 'Toronto, ON',
    avatar: avatar || defaultAvatar,
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    
    localStorage.setItem('userName', userData.name);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setUserData({
      ...userData,
      name: newName,
    });
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setUserData({
      ...userData,
      title: newTitle,
    });
  };

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setUserData({
      ...userData,
      location: newLocation,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">User Profile</Typography>
        </Toolbar>
      </AppBar> */}
      <Box m={2}>
        <Grid container spacing={2}>
          {/* Avatar and Name Section */}
          <Grid item xs={12} sm={6} md={13}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="badge-avatar-upload"
                type="file"
                onChange={handleBadgeAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <IconButton color="primary" component="span" sx={{ position: 'relative' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <SmallAvatar
                        alt="Badge Avatar"
                        src={badgeAvatar}
                        onClick={() => document.getElementById('badge-avatar-upload').click()}
                      />
                    }
                  >
                    <Avatar
                      alt={userData.name}
                      src={userData.avatar}
                      sx={{ width: 100, height: 100, margin: 'auto', bgcolor: blue[500] }}
                    />
                  </Badge>
                  {!avatar && (
                    <CameraAltIcon sx={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: 'large', color: 'white' }} />
                  )}
                </IconButton>
              </label>
              {isEditMode ? (
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={userData.name}
                  onChange={handleNameChange}
                />
              ) : (
                <div>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {userData.name}
                    {isEditMode ? null : (
                      <IconButton
                        color="primary"
                        aria-label="Edit Name"
                        component="span"
                        onClick={handleEditClick}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </Typography>
                </div>
              )}
              {isEditMode ? (
                <TextField
                  fullWidth
                  label="Designation"
                  variant="outlined"
                  value={userData.title}
                  onChange={handleTitleChange}
                />
              ) : (
                <Typography color="textSecondary">{userData.title}</Typography>
              )}
              {isEditMode ? (
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={userData.location}
                  onChange={handleLocationChange}
                />
              ) : (
                <Typography color="textSecondary" sx={{ mb: 2 }}>
                  {userData.location}
                </Typography>
              )}
              {isEditMode ? (
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  Save
                </Button>
              ) : (
                <Button variant="contained" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
              {/* Placeholder for social links */}
              <Box sx={{ mt: 2 }}>
                {/* Render social links here */}
              </Box>
            </Card>
          </Grid>

          {/* Information Section */}
          <Grid item xs={12} sm={6} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Rewards
                </Typography>
                <form noValidate autoComplete="off">
                  <Grid container spacing={3}>
                    {/* Other input fields */}
                  </Grid>
                </form>
              </CardContent>
            </Card>

            {/* Rewards Section */}
            <Rewards />
            
            {/* GiftCard Section */}
            <GiftCard />
          </Grid>

          {/* Graph and Pie Chart Sections */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Total Hours Summary</Typography>
            <Paper>
              <BarChartComponent />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Health/Facility Summary</Typography>
            <Paper>
              <PieChartInsentive />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProfilePage;
