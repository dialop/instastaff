import React, { useState } from 'react';
import { Box, Grid, Container } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import ProfileCard from './ProfileCard';
import RewardsBadges from './RewardsBadges';
import BarChartGraph from './BarChartGraph';
import PieChartIncentive from './PieChartIncentive';
import Confetti from 'react-confetti';
import { useAuth0 } from '@auth0/auth0-react';
import { useRegistration } from '../../context/RegistrationContext';

function ProfilePage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const { isAuthenticated } = useAuth0();
  const { isRegistered } = useRegistration();

  const showProfileComponents = isAuthenticated && isRegistered;

  return (
    <Box m={3}>
      {/* Registration Form */}
      <Box mb={3}>
        <RegistrationForm setShowConfetti={setShowConfetti} />
      </Box>

      {showProfileComponents && (
        <>
          {/* Conditional rendering for authenticated and registered users */}
          <Grid container spacing={0} justifyContent="center">
            {/* Profile Card */}
            <Grid item xs={12} md={6} lg={4}>
              <Container maxWidth="sm" sx={{ padding: '0 !important' }}>
                <ProfileCard />
                {showConfetti && <Confetti recycle={false} onConfettiComplete={() => setShowConfetti(false)} width={3000} height={1000} numberOfPieces={400} />}
              </Container>
            </Grid>

            {/* Rewards Badges */}
            <Grid item xs={12} md={6} lg={4}>
              <Container maxWidth="sm" sx={{ padding: '0 !important' }}>
                <RewardsBadges />
              </Container>
            </Grid>
          </Grid>

          {/* Spacing between the rows */}
          <Box my={4}></Box>

          {/* Graphic Summaries Section */}
          <Grid container spacing={0} justifyContent="center">
            {/* Bar Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Container maxWidth="sm" sx={{ padding: '0 !important' }}>
                <BarChartGraph />
              </Container>
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={6} lg={4}>
              <Container maxWidth="sm" sx={{ padding: '0 !important' }}>
                <PieChartIncentive />
              </Container>
            </Grid>
          </Grid>

          {/* Spacing before the footer */}
          <Box my={4}>
          </Box>
        </>
      )}
    </Box>
  );
}

export default ProfilePage;
