import React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { useRewards } from '../../../context/RewardsContext';

const PointsCBar = () => {
  const { points } = useRewards();
  const userId = window.sessionStorage.getItem('userId');
  const totalPoints = 100;
  const progressPercent = Math.min((points / totalPoints) * 100, 100); // Ensure percentage does not exceed 100

  if (!userId) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100} // Full circle
          size={100} // Adjust size as needed
          thickness={4} // Adjust thickness as needed
          sx={{
            color: 'rgba(0,0,0,0.1)', // Lighter color for the background
          }}
        />
        <CircularProgress
          variant="determinate"
          value={progressPercent}
          size={100} // Adjust size as needed
          thickness={4} // Adjust thickness as needed
          sx={{
            position: 'absolute',
            left: 0,
            color: 'rgba(0, 255, 0, 0.75)', // Custom color for the progress
            // Adjustments to align with the background progress
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round', // Makes the line cap rounded
            },
          }}
        />
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        {`${points}/${totalPoints} points to your next reward!`}
      </Typography>
    </Box>
  );
};

export default PointsCBar;
