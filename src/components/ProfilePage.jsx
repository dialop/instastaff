import React from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import BarChartComponent from './profile/BarChartComponent';
import Rewards from './profile/rewards/Rewards';
import GiftCard from './profile/rewards/GiftCard'; 
import PieChartInsentive from './profile/PieChartInsentive';
import RegistrationForm from './profile/RegistrationForm';

function ProfilePage() {

  return (
    <Box m={2}>
      
      {/* Registration Form */}
      <Box mb={3}>
        <RegistrationForm />
      </Box>

      {/* Information Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Rewards
              </Typography>
              <form noValidate autoComplete="off">
                <Grid container spacing={3}>
                  {/* Other input fields */}
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* Rewards Section */}
          <Rewards />
          
          {/* GiftCard Section */}
          <GiftCard />
        </Grid>

        {/* Graph and Pie Chart Sections */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Total Hours Summary</Typography>
          <BarChartComponent />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Health/Facility Summary</Typography>
          <PieChartInsentive />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePage;
