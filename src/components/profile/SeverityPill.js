import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

function SeverityPill({ color = 'primary', children, ...other }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        alignItems: 'center',
        borderRadius: '12px',
        cursor: 'default',
        display: 'inline-flex',
        flexGrow: 0,
        flexShrink: 0,
        fontSize: '0.75rem',
        lineHeight: 2,
        fontWeight: 600,
        letterSpacing: '0.5px',
        minWidth: 20,
        padding: '0 8px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        backgroundColor: theme.palette[color].main, // Accessing color from theme
        color: theme.palette[color].contrastText, // Accessing contrast text color from theme
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

SeverityPill.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'error',
    'info',
    'warning',
    'success',
  ]),
};

export default SeverityPill;
