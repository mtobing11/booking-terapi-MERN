import React from 'react';

//import components
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles';

const FrontText = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography sx={{fontWeight: 'light'}} variant="h1" align="center">Terapi Ketok Mr. Kevin</Typography>
        <Typography variant="h2" align="center">GRAND GALAXY CITY</Typography>
        <Typography variant="body1" align="center">Jl. Rose Garden 3</Typography>
        <Typography variant="body1" align="center">Ruko Rose Garden Blok RRG 3 no: 67</Typography>
        <Typography variant="body1" align="center">Bekasi</Typography>
      </ThemeProvider>
    </div>
  )
}

export default FrontText