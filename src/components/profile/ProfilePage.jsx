import React from 'react';
import { Box, Grid, Container } from '@mui/material';

import RegistrationForm from './RegistrationForm';
import ProfileCard from './ProfileCard';
import BarChartGraph from './BarChartGraph';
import PieChartIncentive from './PieChartIncentive';

function ProfilePage() {
  return (
    <Box m={3}>
      {/* Registration Form */}
      <Box mb={3}>
        <RegistrationForm />
      </Box>

      {/* Profile Card: Post-Registration */}
      <Container maxWidth="sm" style={{ margin: 'auto' }}>
        <ProfileCard />
      </Container>
      
      {/* Graphic Summaries Section */}
      <Grid container spacing={2} justifyContent="center">
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Container maxWidth="sm">
            <BarChartGraph />
          </Container>
        </Grid>
        
        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Container maxWidth="sm">
            <PieChartIncentive />
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePage;
