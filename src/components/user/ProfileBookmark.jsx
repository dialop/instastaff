import React, { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/VerifiedUser';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LicenseIcon from '@mui/icons-material/CardMembership';
import StarsIcon from '@mui/icons-material/Stars';
import { green } from '@mui/material/colors';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 for authentication status
import { useRegistration } from '../../context/RegistrationContext'; // Adjust the path as necessary

const ProfileBookmark = () => {
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

  // Early return if not authenticated or registered to avoid unnecessary render
  if (!isAuthenticated || !isRegistered || !profile) {
    return null;
  }

  return (
    <Card className="mx-auto mt-10 bg-white shadow-lg" sx={{ maxWidth: 345 }}>
      <CardContent>
        <div className="flex flex-col items-center">
          <Avatar alt={`${profile.first_name} ${profile.last_name}`} src={profile.profile_picture} sx={{ width: 100, height: 100, mb: 2 }} />
          <Chip label={profile.gender} variant="outlined" color="primary" sx={{ mb: 1, borderColor: green[500], color: green[500] }} />
          {profile.is_hero && (
            <Chip icon={<BadgeIcon />} label="Emergency Hero" color="primary" sx={{ mb: 1, backgroundColor: green[500], color: 'white' }} />
          )}
        </div>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h5" component="h2" className="font-bold mb-2 text-center">
          {profile.first_name} {profile.last_name}
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <AccountBoxIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText primary="Username" secondary={profile.handle} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WorkIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText primary="Occupation" secondary={profile.occupation} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LicenseIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText primary="License" secondary={profile.license} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText primary="Email" secondary={profile.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarsIcon sx={{ color: green[500] }} />
            </ListItemIcon>
            <ListItemText primary="Rewards" secondary={`${profile.points} points`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ProfileBookmark;
