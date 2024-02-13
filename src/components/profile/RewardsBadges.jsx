import React from 'react';
import { Container, CardContent, Typography, Grid, Avatar, Tooltip } from '@mui/material';
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
    { src: loveBadge, alt: "Love Badge", label: "Love" },
    { src: teamworkBadge, alt: "Teamwork Badge", label: "Teamwork" },
    { src: plantBadge, alt: "Plant Badge", label: "Growth" },
  ];

  return (
    <Container>
      <CardContent maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6" align="center">Badges Earned</Typography>
          </Grid>
          {badges.map((badge, index) => (
            <Grid item key={index}>
              <Tooltip title={badge.label} placement="top">
                <Avatar
                  src={badge.src}
                  alt={badge.alt}
                  sx={{ width: 64, height: 64, boxShadow: 3 }}
                />
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Container>
  );
};

export default RewardsBadges;
