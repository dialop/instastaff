import React, { useState, useEffect } from 'react';
import { Card, CardContent, Chip, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/VerifiedUser';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LicenseIcon from '@mui/icons-material/CardMembership';
import StarsIcon from '@mui/icons-material/Stars';
import { useAuth0 } from '@auth0/auth0-react';
import { useRegistration } from '../../context/RegistrationContext';

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

  if (!isAuthenticated || !isRegistered || !profile) {
    return null;
  }

  return (
    <Card className="mx-auto mt-10 bg-white shadow-lg" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="h2" className="font-bold text-center">
            {profile.first_name} {profile.last_name}
        </Typography>
        <div className="flex flex-col items-center">
          {profile.is_hero && (
            <Chip icon={<BadgeIcon />} label="Emergency Hero" color="primary" sx={{ mb: 1, backgroundColor: "primary", color: 'white' }} />
          )}
          <Chip label={profile.gender} variant="outlined" sx={{ mb: 1 }} />
        </div>
        <Divider sx={{ my: 2 }} />
        <List dense>
          <ListItem>
            <ListItemIcon>
              <AccountBoxIcon sx={{ color: "#6547A5" }} />
            </ListItemIcon>
            <ListItemText primary="Username" secondary={profile.handle} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WorkIcon sx={{ color: "#6547A5" }} />
            </ListItemIcon>
            <ListItemText primary="Occupation" secondary={profile.occupation} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LicenseIcon sx={{ color: "#6547A5" }} />
            </ListItemIcon>
            <ListItemText primary="License" secondary={profile.license} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon sx={{ color: "#6547A5" }} />
            </ListItemIcon>
            <ListItemText primary="Email" secondary={profile.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarsIcon sx={{ color: "#6547A5" }} />
            </ListItemIcon>
            <ListItemText primary="Rewards" secondary={`${profile.points} points`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ProfileBookmark;
