import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';

import RegistrationForm from './RegistrationForm';
import ProfileCard from './ProfileCard';
import BarChartComponent from './BarChartComponent';
import PieChartIncentive from './PieChartIncentive';
import Confetti from 'react-confetti';

function ProfilePage() {
  const [showConfetti, setShowConfetti] = useState(false); 
  
  return (
    <Box m={3}>
      
      {/* Registration Form */}
      <Box mb={3}>
        <RegistrationForm setShowConfetti={setShowConfetti} />
      </Box>

      {/* Profile Card: Post-Registration */}
      <Box m={3}>
        <ProfileCard />
        {showConfetti && <Confetti recycle={false} onConfettiComplete={ () => setShowConfetti(false) } width={3000} height={1000} numberOfPieces={400} />}{/* Show confetti if showConfetti is true */}
      </Box>
      
      {/* Graphic Summaries Section */}
      <Grid container spacing={2}>
        
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <BarChartComponent />
        </Grid>
        
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <PieChartIncentive />
        </Grid>
      
      </Grid>
    </Box>
  );
}

export default ProfilePage;
