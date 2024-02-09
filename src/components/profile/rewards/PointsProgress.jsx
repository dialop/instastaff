import React, {useState} from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

const PointsProgress = () => {
  
  const [currentPoints] = useState(150);
  const totalPoints = 500;
  const nextRewardPoints = totalPoints - currentPoints;
  
  const progressPercent = (currentPoints / totalPoints) * 100;

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
        {`${currentPoints}/${totalPoints} points to your next reward!`}
      </Typography>
    </Box>
  );
};

export default PointsProgress;

{/* <Box display="flex" flexDirection="column" alignItems="center" p={2}>
<Typography variant="h6" gutterBottom>
  
</Typography>
<Box width="100%" mb={2}>
  <LinearProgress variant="determinate" value={progressPercent} />
</Box>
<Typography variant="subtitle1">
  {`${currentPoints}/${totalPoints} points to your next reward!`}
</Typography>
</Box> */}