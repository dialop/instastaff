import React from 'react';
import { CircularProgress, Box, Chip } from '@mui/material';
import { useRewards } from '../../../context/RewardsContext';

const PointsCBar = () => {
  const { points } = useRewards();
  const userId = window.sessionStorage.getItem('userId');
  const totalPoints = 500;
  // Adjust the progressPercent calculation to ensure it does not go below 0
  const progressPercent = points < 0 ? 500 : Math.min((points / totalPoints) * 100, 500);

  if (!userId) {
    return null;
  }

  const chipStyle = {
    mt: 2,
    fontWeight: 'bold',
    backgroundColor: points < 0 ? 'rgba(255, 0, 0, 0.5)' : points < totalPoints ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.75)', // Red if negative points, greyed out if points < 100, otherwise green
    color: points < totalPoints ? 'rgba(0, 0, 0, 0.5)' : 'white', // Dim text if points < 500, otherwise white text
    '& .MuiChip-label': {
      color: points < totalPoints ? 'rgba(0, 0, 0, 0.5)' : 'black', // Ensure the label text color matches the chip's text color
    },
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={500} 
          size={94}
          thickness={5}
          sx={{
            color: 'rgba(0,0,0,0.1)',
          }}
        />
        <CircularProgress
          variant="determinate"
          value={progressPercent}
          size={94}
          thickness={5}
          sx={{
            position: 'absolute',
            left: 0,
            color: points >= 0 ? 'rgba(0, 255, 0, 0.75)' : 'rgba(255, 0, 0, 0.5)', // Green if positive points, lighter red if negative
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
      <Chip
        label={`${points}/${totalPoints} Points to Redeem`}
        color="primary"
        sx={chipStyle}
      />
    </Box>
  );
};

export default PointsCBar;
