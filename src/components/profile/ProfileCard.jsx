import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/VerifiedUser';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LicenseIcon from '@mui/icons-material/CardMembership';
import StarsIcon from '@mui/icons-material/Stars';
import { Avatar, 
  CardContent, 
  Chip, 
  Container, 
  Divider, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Paper, 
  Typography } from '@mui/material';


const ProfileCard = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(`/user/profile/${user.sub}`, { // Ensure endpoint matches the server route
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
    
        const profileData = await response.json();
        console.log(profileData); // Log to verify data structure
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user?.sub, getAccessTokenSilently]);
  
  // Sample Data
  // const profile = {
  //   first_name: 'Jane',
  //   last_name: 'Doe',
  //   handle: 'jane_doe_nurse',
  //   email: 'jane.doe@example.com',
  //   profile_picture: 'https://i.pravatar.cc/300',
  //   gender: 'Female',
  //   occupation: 'Super Nurse',
  //   license: 'RN007',
  //   isHero: true,
  //   points: 120,
  // };

  return (
    <Container maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <div className="flex flex-col items-center">
              <Avatar alt={`${profile.first_name} ${profile.last_name}`} src={profile.profile_picture} sx={{ width: 100, height: 100, mb: 2 }} />
              <Chip label={profile.gender} variant="outlined" sx={{ mb: 1 }} />
              {profile.isHero && (
                <Chip icon={<BadgeIcon />} label="Emergency Hero" color="primary" sx={{ mb: 1 }} />
              )}
            </div>
            <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }} />
            <Grid item xs={12} sm={7}>
              <Paper elevation={4} sx={{ p: 2, mb: 2, backgroundColor: '#e3f2fd', textAlign: 'center' }}>
                  <Typography variant="h5" component="h2" className="font-bold" sx={{ color: '#6547A5' }}>
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
