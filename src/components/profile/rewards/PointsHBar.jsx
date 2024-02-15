import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';
import { useRewards } from '../../../context/RewardsContext';
import { Link } from 'react-router-dom'; // Import Link

const PointsHBar = () => {
  const { points } = useRewards();
  const userId = window.sessionStorage.getItem('userId');
  const totalPoints = 500;
  
  let progressPercent = Math.max(0, Math.min((points / totalPoints) * 100, 100));

  // Using a function to render message to include JSX for Link
  const renderPointsMessage = () => {
    if (points >= 500) {
      return (
        <span>
          {`${points}/${totalPoints} points. Time to `}
          <Link to="/profile" style={{ textDecoration: 'underline', color: 'inherit' }}>redeem!</Link>
        </span>
      );
    } else if (points >= 0) {
      return `${points}/${totalPoints} points to your next reward.`;
    } else {
      return `${points} points. Let's be positive about this.`;
    }
  };

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
              backgroundColor: points >= 0 ? 'rgba(0, 255, 0, 0.75)' : '#ff0000',
            },
            backgroundColor: points >= 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 0, 0, 0.5)',
          }}
        />
      </Box>
      <Typography variant="subtitle1">
        {renderPointsMessage()} {/* Call the function to render the message */}
      </Typography>
    </Box>
  );
};

export default PointsHBar;
