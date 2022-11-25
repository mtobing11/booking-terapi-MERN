import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { Paper, Typography } from '@mui/material';
import Header from '../Header/Header';
import NewBookingDate from './NewBookingDate/NewBookingDate';
import TableBasic from '../Tables/TableBasic';

// import actions
import { getAllDates } from '../../../../actions/book';

// functions
import { formattingDate } from '../../../../utils/utils';

// class
const BookingDateControl = () => {
  const dispatch = useDispatch();
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);
  
  // const [formNewDate, setFormNewDate] = useState({ newdatebook: dayjs(dateNow), capacitybook: 20, maxbooking: 2 });
  const [dataAvailable, setDataAvailable] = useState('');
  const availableDate = useSelector((state) => state.books.availableDate);

  useEffect(() => {
    let dateNow = new Date(11-25-2022);
    dateNow.setDate(dateNow.getDate());

    // dispatch(getAvailableDates("dayjs(new Date(dateNow))", { status: true }))
    dispatch(getAllDates(dayjs(new Date(dateNow))))
  }, [])

  useEffect(() => {
    if(availableDate){
      availableDate.map((item) => {
        let newDate = formattingDate(new Date(item.bookingdate), 'dmmy')
        item.bookingdate = newDate;
      })
      setDataAvailable(availableDate)
    }
    
  }, [availableDate])

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', p: '0.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Booking Date" />
        
        <NewBookingDate />
        <Paper sx={{m: '1rem',p: '1rem'}} elevation={6}>
            <Typography variant="h6" sx={{m: '1rem'}} elevation={6}>Tanggal yang sedang dibuka</Typography>
            <TableBasic header={['Tanggal', 'Jumlah Shift', 'Capacity/shift', 'Max/HP', 'Status', 'Schedule' ]} content={dataAvailable} />
        </Paper>
    </Paper>
  )
}

export default BookingDateControl