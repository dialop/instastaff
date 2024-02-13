import React from 'react';
import { Container, CardContent, Typography, Grid, Avatar, Tooltip } from '@mui/material';

// Import images
import profileBadge from '../../assets/badges/profile-badge.png'
import loveBadge from '../../assets/badges/love-badge.png';
import teamworkBadge from '../../assets/badges/teamwork-badge.png';
import plantBadge from '../../assets/badges/plant-badge.png';

const RewardsBadges = () => {
  const userId = window.sessionStorage.getItem('userId');

  if (!userId) {
    return null;
  }

  // Use imported images with an "earned" status for demonstration
  const badges = [
    { src: profileBadge, alt: "Profile Badge", label: "Earned: registration completed.", earned: true},
    { src: loveBadge, alt: "Love Badge", label: "Challenge: finish first emergency shift.", earned: false },
    { src: teamworkBadge, alt: "Teamwork Badge", label: "Challenge: receive a positive review.", earned: false },
    { src: plantBadge, alt: "Plant Badge", label: "Challenge: save life.", earned: false },
  ];

  return (
    <Container>
      <CardContent maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
        {/* Typography Row */}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
              Badges Earned
            </Typography>
          </Grid>
        </Grid>
        {/* Badges Row */}
        <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
          {badges.map((badge, index) => (
            <Grid item key={index}>
              <Tooltip title={badge.label} placement="top">
                <div className={badge.earned ? '' : 'filter grayscale'}>
                  <Avatar
                    src={badge.src}
                    alt={badge.alt}
                    sx={{
                      width: 64,
                      height: 64,
                      boxShadow: 3,
                    }}
                    className="overflow-hidden rounded-full" // Tailwind classes for rounded and overflow
                  />
                </div>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Container>
  );
};

export default RewardsBadges;
