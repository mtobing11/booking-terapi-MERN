import React from 'react';

// import components
import { Paper, Typography, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Header from '../Header/Header'

const BookingDateControl = () => {
  return (
    <Paper elevation={1} sx={{ m: '0.75rem', p: '0.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Booking Date" />
        <Paper>
            <Typography variant="h6" sx={{m: '1rem'}} elevation={6}>Open new date</Typography>
            
        </Paper>
    </Paper>
  )
}

export default BookingDateControl