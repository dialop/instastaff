import React from 'react';
import { Box, Grid } from '@mui/material';

import RegistrationForm from './RegistrationForm';
import ProfileCard from './ProfileCard';
import BarChartComponent from './BarChartComponent';
import PieChartIncentive from './PieChartIncentive';

function ProfilePage() {

  return (
    <Box m={3}>
      
      {/* Registration Form */}
      <Box mb={3}>
        <RegistrationForm />
      </Box>

      {/* Profile Card: Post-Registration */}
      <Box m={3}>
        <ProfileCard />
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
