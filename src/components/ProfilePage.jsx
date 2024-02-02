import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar, Button, Stack, IconButton, Paper, Badge } from '@mui/material';
import { blue } from '@mui/material/colors';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Chart from './profile/Chart'; // Your custom chart component
import Logo from './profile/Logo'; // Your custom logo component
import Scrollbar from './profile/Scrollbar'; // Your custom scrollbar component
import SeverityPill from './profile/SeverityPill'; // Your custom severity pill component
import BarChartComponent from './profile/BarChartComponent';
import PieChartInsentive from './profile/PieChartInsentive';
import { styled } from '@mui/material/styles';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function ProfilePage() {
  // Retrieve the avatar and badge avatar from localStorage or use default paths
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || '');
  const [badgeAvatar, setBadgeAvatar] = useState(localStorage.getItem('badgeAvatar') || '/static/images/avatar/1.jpg');
  const defaultAvatar = '/path/to/default/avatar.jpg'; // Path to your default avatar

  // Function to handle avatar change
  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newAvatar = URL.createObjectURL(event.target.files[0]);
      setAvatar(newAvatar);
      localStorage.setItem('userAvatar', newAvatar);
    }
  };

  // Function to handle badge avatar change
  const handleBadgeAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const newBadgeAvatar = URL.createObjectURL(event.target.files[0]);
      setBadgeAvatar(newBadgeAvatar);
      localStorage.setItem('badgeAvatar', newBadgeAvatar);
    }
  };

  useEffect(() => {
    // If there's an avatar or badge avatar in localStorage, use them
    const storedAvatar = localStorage.getItem('userAvatar');
    const storedBadgeAvatar = localStorage.getItem('badgeAvatar');
    if (storedAvatar) {
      setAvatar(storedAvatar);
    }
    if (storedBadgeAvatar) {
      setBadgeAvatar(storedBadgeAvatar);
    }
  }, []);

  // Define the user's data
  const userData = {
    name: 'Diana Lopez',
    title: 'Registered Nurse, RN',
    location: 'Toronto, ON',
    avatar: avatar || defaultAvatar,
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {/* New Profile Picture and Name Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: 'center', p: 3 }}>
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
            <Typography variant="h5" sx={{ mt: 2 }}>
              {userData.name}
            </Typography>
            <Typography color="textSecondary">{userData.title}</Typography>
            <Typography color="textSecondary" sx={{ mb: 2 }}>
              {userData.location}
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button variant="contained" size="small">
              </Button>
              <Button variant="outlined" size="small">
              </Button>
            </Stack>
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
              {/* Placeholder for information */}
              <Typography variant="h5">Information</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Badges and Incentives Sections */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              {/* Custom components or placeholders for badges */}
              <Typography variant="h5">Badges</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Card>
            <CardContent>
              {/* Custom components or placeholders for incentives */}
              <Typography variant="h5">Incentives</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Graph and Pie Chart Sections */}
        <Grid item xs={12} md={6}>
          <Paper>
            <BarChartComponent />
            <Typography variant="h6">Monthly Validation Summary</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <PieChartInsentive />
            <Typography variant="h6">Health/Facility Summary</Typography>
          </Paper>
        </Grid>

        {/* Footer */}
        <Grid item xs={12}>
          <Box sx={{ bgcolor: 'grey.800', color: 'white', p: 2 }}>
            {/* Placeholder for footer content */}
            <Typography variant="body2">InstaStaff &copy;</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePage;
