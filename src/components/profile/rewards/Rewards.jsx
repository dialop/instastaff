// Rewards.js
import React, { useState } from 'react';
import { Typography, LinearProgress, Grid, Box, Card, CardContent, CardActions, Button } from '@mui/material';
import GiftCard from './GiftCard'; 
const Rewards = () => {
  const [currentPoints, setCurrentPoints] = useState(150);
  const totalPoints = 300;
  const nextRewardPoints = totalPoints - currentPoints;
  const accountBalance = '$15.25';

  const collectPoints = (pointsToAdd) => {
    setCurrentPoints(currentPoints + pointsToAdd);
  };

  return (
    <Box m={2}>
      <Typography variant="h5">{`${currentPoints}/${totalPoints} points`}</Typography>
      <LinearProgress variant="determinate" value={(currentPoints / totalPoints) * 100} />
      <Typography variant="subtitle1">{`${nextRewardPoints} points to your next reward`}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Collect Points</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" onClick={() => collectPoints(10)}> 
                Book Shifts
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12}>

          <GiftCard currentPoints={currentPoints} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Account Balance: {accountBalance}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Rewards;
