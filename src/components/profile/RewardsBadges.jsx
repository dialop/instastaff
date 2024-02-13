import React from 'react';
import { Chip, Container, CardContent, Typography, Grid, Avatar, Tooltip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';

import profileBadge from '../../assets/badges/profile-badge.png'
import loveBadge from '../../assets/badges/love-badge.png';
import teamworkBadge from '../../assets/badges/teamwork-badge.png';
import plantBadge from '../../assets/badges/plant-badge.png';

const RewardsBadges = () => {
  const userId = window.sessionStorage.getItem('userId');

  if (!userId) {
    return null;
  }

  const badges = [
    { src: profileBadge, alt: "Profile Badge", label: "Earned: registration complete.", earned: true},
    { src: loveBadge, alt: "Love Badge", label: "Challenge: finish first emergency shift.", earned: false },
    { src: teamworkBadge, alt: "Teamwork Badge", label: "Challenge: receive a positive review.", earned: false },
    { src: plantBadge, alt: "Plant Badge", label: "Challenge: save a life.", earned: false },
  ];

  return (
    <Container maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">      
      <CardContent>
        <Grid container justifyContent="center" alignItems="center" sx={{ marginBottom: '20px' }}>
          <Chip icon={<EmojiEventsIcon />} color="primary" label="Badges Earned" sx={{ fontSize: '1rem', margin: '10px', backgroundColor: '#6547A5' }} />
        </Grid>
        <Grid container spacing={4} justifyContent="space-evenly" alignItems="center">
          {badges.map((badge, index) => (
            <Grid item key={index}>
              <Tooltip title={badge.label} placement="top">
                <div className={badge.earned ? '' : 'filter grayscale'}>
                  <Avatar
                    src={badge.src}
                    alt={badge.alt}
                    sx={{
                      width: 80, 
                      height: 80,
                      boxShadow: 3,
                      margin: 'auto',
                      bgcolor: 'rgba(0, 255, 255, 0.25)'
                    }}
                  />
                </div>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: '20px' }}>
          <Chip icon={<StarIcon />} color="primary" label="Redeem Rewards" sx={{ fontSize: '1rem', margin: '10px', backgroundColor: '#6547A5' }} />
        </Grid>
      </CardContent>
    </Container>
  );
};

export default RewardsBadges;
