import React from 'react';
import { Chip, Container, CardContent, Typography, Grid, Avatar, Tooltip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import PointsCBar from './rewards/PointsCBar';
import RedeemPointsButton from './rewards/RedeemPointsButton';

import profileBadge from '../../assets/badges/profile-badge.png';
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
    { src: loveBadge, alt: "Love Badge", label: "Challenge: finish first emergency shift.", earned: true },
    { src: teamworkBadge, alt: "Teamwork Badge", label: "Challenge: receive a positive review.", earned: false },
    { src: plantBadge, alt: "Plant Badge", label: "Challenge: save a life.", earned: false },
  ];

  return (
    <Container maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
      <CardContent>
        {/* Badges Earned Section */}
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginBottom: '20px', color: '#6547A5' }}>
          <Chip icon={<EmojiEventsIcon />} color="primary" label="Badges Earned" sx={{ fontSize: '1rem', backgroundColor: '#6547A5', color: 'white' }} />
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {badges.map((badge, index) => (
            <Grid item key={index} xs={6} sm={3}>
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
                      bgcolor: 'rgba(0, 255, 255, 0.25)',
                    }}
                  />
                </div>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
        
        {/* Redeem Rewards Section */}
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginTop: '40px', color: '#6547A5' }}>
          <Chip icon={<StarIcon />} color="primary" label="Redeem Rewards" sx={{ fontSize: '1rem', backgroundColor: '#6547A5', color: 'white' }} />
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ marginTop: '0px' }}>
          <Grid item xs={12} sm={6}>
            <PointsCBar />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RedeemPointsButton />
          </Grid>
        </Grid>
      </CardContent>
    </Container>
  );
};

export default RewardsBadges;
