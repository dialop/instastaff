import React from 'react';
import { Container, CardContent, Typography, LinearProgress, Box, Paper, Grid, Chip } from '@mui/material';
import { useRewards } from '../../context/RewardsContext';

const RewardsBadges = () => {
  const { points } = useRewards();
  const userId = window.sessionStorage.getItem('userId');
  const totalPoints = 500;
  const progressPercent = Math.min((points / totalPoints) * 100, 100); // Ensure percentage does not exceed 100

  if (!userId) {
    return null;
  }

  return (
    <Container >
      <CardContent maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
        <Grid container spacing={2} alignItems="center">
          <Typography>Badges Earned</Typography>
        </Grid>
      </CardContent>
    </Container>
  );
};

export default RewardsBadges;
