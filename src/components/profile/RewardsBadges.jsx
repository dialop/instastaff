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
    <Container maxWidth="sm" className="bg-white p-6 rounded-lg shadow-md mt-5">
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Box className="flex flex-col items-center w-full">
            <Paper elevation={4} sx={{ width: '100%', mb: 2, borderRadius: 20, overflow: 'hidden' }}>
              <LinearProgress 
                variant="determinate" 
                value={progressPercent} 
                sx={{
                  height: 10,
                  borderRadius: 20,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'rgba(0, 255, 0, 0.75)'
                  }
                }}
              />
            </Paper>
            <Typography variant="subtitle1" className="font-bold" sx={{ color: '#6547A5' }}>
              {`${points}/${totalPoints} points to your next reward!`}
            </Typography>
            <Chip label={`${progressPercent}% Achieved`} color="primary" variant="outlined" sx={{ mt: 1 }} />
          </Box>
        </Grid>
      </CardContent>
    </Container>
  );
};

export default RewardsBadges;
