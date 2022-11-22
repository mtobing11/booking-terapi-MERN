import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { Paper, Typography } from '@mui/material';
import Header from '../Header/Header';
import NewBookingDate from './NewBookingDate/NewBookingDate';
import TableBasic from '../Tables/TableBasic';

// import actions
import { getAvailableDates } from '../../../../actions/book';

// functions

function formatDate(date){
    let d = new Date(date),
        month = '' + d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear();

    let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let newDate = [day, monthName[month], year].join(' ');
    return newDate
}

// class
const BookingDateControl = () => {
  const dispatch = useDispatch();
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);
  
  const [formNewDate, setFormNewDate] = useState({ newdatebook: dayjs(dateNow), capacitybook: 20, maxbooking: 2 });
  const [dataAvailable, setDataAvailable] = useState('');
  const availableDate = useSelector((state) => state.books.availableDate);

  useEffect(() => {
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate());

    dispatch(getAvailableDates(dayjs(new Date(dateNow))))
  }, [])

  useEffect(() => {
    if(availableDate){
      availableDate.map((item) => {
        let newDate = formatDate(item.bookingdate, 'dmmy')
        item.bookingdate = newDate
      })
      setDataAvailable(availableDate)
    }
  }, [availableDate])

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', p: '0.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Booking Date" />
        
        <Paper sx={{m: '1rem',p: '1rem'}} elevation={6}>
            <Typography variant="h6" sx={{m: '1rem'}} elevation={6}>Tanggal yang sedang dibuka</Typography>
            <TableBasic header={['Tanggal', 'Jumlah Shift', 'Max / shift', 'Max Booking / HP', 'Status' ]} content={dataAvailable} />
        </Paper>
        <NewBookingDate />
    </Paper>
  )
}

export default BookingDateControl