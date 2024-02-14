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

  const canRedeem = points >= 100 && !loading;

  const buttonSx = {
    bgcolor: green[500],
    '&:hover': {
      bgcolor: green[700],
    },
    transition: 'background-color 0.5s',
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
    if (!loading && canRedeem) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        removePoints(100, false);
        setSuccess(true);
        setLoading(false);
        toast.success(
          <div>
            ✨ Congratulations ✨ <br/>
            You've redeemed 100 points for <br/>
            a surprise gift 🎁 <br/>
          </div>
          , {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 1500); // Adjust redemption loading time here
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative', mb: 2, display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
        <Fab
          aria-label="redeem"
          color="primary"
          sx={{
            ...buttonSx,
            width: 94, 
            height: 94, 
            zIndex: 10,
            '& .MuiSvgIcon-root': { 
              fontSize: '2.5rem',
            },
          }}
          onClick={handleButtonClick}
          disabled={!canRedeem}
          className={`${canRedeem ? 'animate-twinkle' : ''}`}
        >
          {success ? <CheckIcon /> : <MonetizationOnIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={110}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-55px',
              marginLeft: '-55px',
              zIndex: 1,
            }}
          />
        )}
      </Box>
      <Button
        variant="contained"
        sx={{
          ...buttonSx,
          padding: '2px 4px', // Top and bottom padding, Left and right padding
          fontSize: '0.9rem', // Adjust based on your preference
        }}
        disabled={!canRedeem}
        onClick={handleButtonClick}
      >
        Redeem Rewards
      </Button>
    </Box>  
  );
}
