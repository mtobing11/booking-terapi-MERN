import React from 'react';

import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles';

const Footer = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <ThemeProvider theme={theme}>
        <Typography variant="body1" align="center">digitalmartinhouse.com</Typography>
        <Typography variant="body1" align="center">ver 2.0.0</Typography>
      </ThemeProvider>
    </div>
  )
}

export default Footer