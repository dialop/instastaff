import React from 'react';
import { Container, CardContent, Typography, Grid } from '@mui/material';
import { useRewards } from '../../context/RewardsContext';

// Import images
import loveBadge from '../../assets/badges/love-badge.png';
import teamworkBadge from '../../assets/badges/teamwork-badge.png';
import plantBadge from '../../assets/badges/plant-badge.png';

const RewardsBadges = () => {
  const { points } = useRewards();
  const userId = window.sessionStorage.getItem('userId');

  if (!userId) {
    return null;
  }

  // Use imported images
  const badges = [
    { src: loveBadge, alt: "Love Badge" },
    { src: teamworkBadge, alt: "Teamwork Badge" },
    { src: plantBadge, alt: "Plant Badge" },
  ];

  return (
    <Container>
      <CardContent maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">Badges Earned</Typography>
          </Grid>
          {badges.map((badge, index) => (
            <Grid item key={index}>
              <div className="inline-flex overflow-hidden rounded-full">
                <img src={badge.src} alt={badge.alt} className="w-16 h-16 object-cover" />
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Container>
  );
};

export default RewardsBadges;
