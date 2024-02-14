import React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { useRewards } from '../../../context/RewardsContext';

const PointsCBar = () => {
  const { points } = useRewards();
  const userId = window.sessionStorage.getItem('userId');
  const totalPoints = 100;
  const progressPercent = Math.min((points / totalPoints) * 100, 100);

  if (!userId) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100} 
          size={100}
          thickness={4}
          sx={{
            color: 'rgba(0,0,0,0.1)',
          }}
        />
        <CircularProgress
          variant="determinate"
          value={progressPercent}
          size={100}
          thickness={4} 
          sx={{
            position: 'absolute',
            left: 0,
            color: 'rgba(0, 255, 0, 0.75)', 
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {`${points}/${totalPoints} to redeem!`}
      </Typography>
    </Box>
  );
};

export default PointsCBar;
