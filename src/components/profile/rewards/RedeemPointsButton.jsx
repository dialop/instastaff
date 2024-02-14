import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useRewards } from '../../../context/RewardsContext';
import { toast } from "react-toastify";

export default function RedeemPointsButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();
  const { points, removePoints } = useRewards();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
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
        removePoints(100, false); // Suppress toast for point deduction
        setSuccess(true);
        setLoading(false);
        toast.success("Congratulations! You've redeemed 100 points for rewards.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 2000);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative', mb: 2 }}>
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
              color: '#C9FFFF',
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
        Redeem Rewards!
      </Button>
    </Box>
  );
}
