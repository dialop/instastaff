import React from 'react';
import { Box, Grid, Container } from '@mui/material';

import RegistrationForm from './RegistrationForm';
import ProfileCard from './ProfileCard';
import RewardsBadges from './RewardsBadges';
import BarChartGraph from './BarChartGraph';
import PieChartIncentive from './PieChartIncentive';

function ProfilePage() {
  return (
    <Box m={3}>
      {/* Registration Form */}
      <Box mb={3}>
        <RegistrationForm />
      </Box>

      {/* Profile Card and Rewards Badges: Post-Registration */}
      <Grid container spacing={4} justifyContent="center">
        {/* Profile Card */}
        <Grid item xs={12} md={6}>
          <Container maxWidth="sm">
            <ProfileCard />
          </Container>
        </Grid>
        
        {/* Rewards Badges */}
        <Grid item xs={12} md={6}>
          <Container maxWidth="sm">
            <RewardsBadges />
          </Container>
        </Grid>
      </Grid>
      
      {/* Spacing between the rows */}
      <Box my={4}> {/* Adjust vertical margin as needed for space between rows */}
      </Box>
      
      {/* Graphic Summaries Section */}
      <Grid container spacing={4} justifyContent="center">
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
      
      {/* Spacing before the footer */}
      <Box my={4}> {/* Adjust vertical margin as needed for space before the footer */}
        {/* Footer Content Here */}
      </Box>
    </Box>
  );
}

export default ProfilePage;
