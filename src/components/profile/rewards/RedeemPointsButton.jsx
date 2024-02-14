import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useRewards } from '../../../context/RewardsContext';

export default function RedeemPointsButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();
  const { points, addPoints } = useRewards();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500], // Adjusted to green[500] for visibility
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading && points >= 100) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        addPoints(-100); // Deduct 100 points on redeem
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> {/* Adjusted for vertical alignment */}
      <Box sx={{ position: 'relative', mb: 2 }}> {/* Added margin for spacing */}
        <Fab
          aria-label="redeem"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
          disabled={points < 100}
        >
          {success ? <CheckIcon /> : <MonetizationOnIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500], // Adjusted to green[500] for visibility
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={loading || points < 100}
        onClick={handleButtonClick}
      >
        Redeem Points
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500], // Adjusted to green[500] for visibility
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}
