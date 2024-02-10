import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';
import { useRewards } from '../../../context/RewardsContext';

const PointsProgress = () => {
  const { points } = useRewards();
  const userId = window.sessionStorage.getItem('userId');
  const totalPoints = 500; 
  const progressPercent = Math.min((points / totalPoints) * 100, 100); // Ensure percentage does not exceed 100

  if (!userId) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box width="100%" mb={0} sx={{ borderRadius: 20, overflow: 'hidden' }}>
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
      </Box>
      <Typography variant="subtitle1">
        {`${points}/${totalPoints} points to your next reward!`}
      </Typography>
    </Box>
  );
};

export default PointsProgress;