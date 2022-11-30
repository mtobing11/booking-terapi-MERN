import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { Paper, Typography } from '@mui/material';
import Header from '../Header/Header';
import NewBookingDate from './NewBookingDate/NewBookingDate';
import TableBasic from '../Tables/TableBasic';

// import actions
import { getAllDates } from '../../../../actions/dashboardMenu';
// import { getAllDates } from '../../../../actions/book';

// functions
import { formattingDate } from '../../../../utils/utils';

// class
const BookingDateControl = () => {
  const editDateRef = useRef()
  const dispatch = useDispatch();
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);
  
  const [dataAvailable, setDataAvailable] = useState('');
  const availableDate = useSelector((state) => state.dashboard.dates);

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', p: '0.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Booking Date" />
        
        <NewBookingDate editDateRef={editDateRef} />
        <Paper sx={{m: '1rem', p: '1rem'}} elevation={6}>
            <Typography variant="h6" sx={{m: '1rem'}} elevation={6}>Tanggal yang sedang dibuka</Typography>
            <TableBasic header={['Tanggal', 'Jumlah Shift', 'Capacity/shift', 'Max/HP', 'Status', 'Schedule' ]} 
              content={availableDate} editDateRef={editDateRef}
            />
        </Paper>
    </Paper>
  )
}

export default BookingDateControl