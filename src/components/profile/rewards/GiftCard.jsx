import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const GiftCard = () => {
  const [redeemGiftCard, setRedeemGiftCard] = useState(false);

  const handleRedeemGiftCard = async () => {
    if (redeemGiftCard) {
      try {
        const response = await fetch('https://', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_CARDLY}`,
          },
          body: JSON.stringify({
          }),
        });

        if (response.ok) {
     
          console.log('Gift card redeemed successfully.');
        } else {
       
          console.error('Gift card redemption failed.');
        }
      } catch (error) {
       
        console.error('An error occurred while redeeming the gift card.', error);
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Gift Card Redemption</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setRedeemGiftCard(!redeemGiftCard)}
        >
          {redeemGiftCard ? 'Cancel Redemption' : 'Redeem Now'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default GiftCard;
