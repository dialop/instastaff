import React from 'react';
import Box from '@mui/material/Box';

const Scrollbar = (props) => {
    // Using the sx prop for styles
  return (
    <Box
      sx={{
        overflow: 'auto',
        maxHeight: '100%',
        width: '100%', // Example, set the width to 100%
        '&::-webkit-scrollbar': {
          width: '0.4em' // Example, custom scrollbar width
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
        // Add other custom styles here
      }}
      {...props}
    >
      {/* Scrollbar content */}
      {props.children}
    </Box>
  );
}

export default Scrollbar;
