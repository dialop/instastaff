import React, {useState, useEffect } from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

const PointsProgress = () => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const totalPoints = 500; 

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = window.sessionStorage.getItem('userId'); // Ensure userId is stored here upon login
      if (!userId) return;

      try {
        const response = await fetch(`/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user data');

        const data = await response.json();
        setCurrentPoints(data.points); // Assuming 'points' is the field you want from the response
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

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

// const PointsProgress = () => {
//   const [currentPoints] = useState(150);
//   const totalPoints = 500;  
//   const progressPercent = (currentPoints / totalPoints) * 100;

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" p={2}>
//       <Box width="100%" mb={0} sx={{ borderRadius: 20, overflow: 'hidden' }}>
//         <LinearProgress 
//           variant="determinate" 
//           value={progressPercent} 
//           sx={{
//             height: 10,
//             borderRadius: 20,
//             '& .MuiLinearProgress-bar': {
//               backgroundColor: 'rgba(0, 255, 0, 0.75)'
//             }
//           }}
//         />
//       </Box>
//       <Typography variant="subtitle1">
//         {`${currentPoints}/${totalPoints} points to your next reward!`}
//       </Typography>
//     </Box>
//   );
// };