import React from 'react';
import { CircularProgress, Box, Chip } from '@mui/material';
import { useRewards } from '../../../context/RewardsContext';

const PointsCBar = () => {
  const { points } = useRewards();
  const userId = window.sessionStorage.getItem('userId');
  const totalPoints = 100;
  const progressPercent = Math.min((points / totalPoints) * 100, 100);

  if (!userId) {
    return null;
  }

  const chipStyle = {
    mt: 2,
    fontWeight: 'bold',
    backgroundColor: points < totalPoints ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.75)', // Greyed out if points < 100, otherwise green
    color: points < totalPoints ? 'rgba(0, 0, 0, 0.5)' : 'white', // Dim text if points < 100, otherwise white text
    '& .MuiChip-label': {
      color: points < totalPoints ? 'rgba(0, 0, 0, 0.5)' : 'black', // Ensure the label text color matches the chip's text color
    },
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={100} 
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
            color: 'rgba(0, 255, 0, 0.75)', 
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
