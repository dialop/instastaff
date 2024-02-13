import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, CardContent, Chip, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography, Container, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/VerifiedUser';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LicenseIcon from '@mui/icons-material/CardMembership';
import StarsIcon from '@mui/icons-material/Stars';
import { useRegistration } from '../../context/RegistrationContext';

const ProfileCard = () => {
  const [profile, setProfile] = useState({});
  const { isAuthenticated } = useAuth0();
  const { isRegistered } = useRegistration();

  useEffect(() => {
    const userId = window.sessionStorage.getItem('userId');
    if (userId && isAuthenticated && isRegistered) {
      fetch(`/user/${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.is_registered) {
            setProfile(data);
          }
        })
        .catch(error => console.error("Failed to fetch user data:", error));
    }
  }, [isRegistered, isAuthenticated]);
  
  if (!isAuthenticated || !isRegistered) {
    return null;
  }

  return (
    <Container maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <div className="flex flex-col items-center">
              <Avatar alt={`${profile.first_name} ${profile.last_name}`} src={profile.profile_picture} sx={{ width: 100, height: 100, mb: 2 }} />
              {profile.is_hero && (
                <Chip icon={<BadgeIcon />} label="Emergency Hero" color="primary" sx={{ mb: 1 }} />
              )}
              <Chip label={profile.gender} variant="outlined" sx={{ mb: 1 }} />
            </div>
            <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }} />
            <Grid item xs={12} sm={7}>
              <Paper elevation={4} sx={{ p: 2, mb: 2, backgroundColor: 'rgba(0, 255, 255, 0.25)', textAlign: 'center' }}>
                  <Typography variant="h5" component="h2" className="bold" sx={{ color: '#6547A5' }}>
                    {profile.first_name} {profile.last_name}
                  </Typography>
              </Paper>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <AccountBoxIcon sx={{ color: '#6547A5' }} />
                  </ListItemIcon>
                  <ListItemText primary="Username" secondary={profile.handle} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon sx={{ color: '#6547A5' }} />
                  </ListItemIcon>
                  <ListItemText primary="Occupation" secondary={profile.occupation} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LicenseIcon sx={{ color: '#6547A5' }} />
                  </ListItemIcon>
                  <ListItemText primary="License" secondary={profile.license} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon sx={{ color: '#6547A5' }} />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={profile.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                      <StarsIcon sx={{ color: '#6547A5' }} />
                  </ListItemIcon>
                  <ListItemText primary="Rewards" secondary={`${profile.points} points`} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
    </Container>
  );
};

export default ProfileCard;
