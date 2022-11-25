import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { Paper, Typography, Button } from '@mui/material';
import TableBasic from '../Tables/TableBasic';

// import actions
import { getAvailableDates } from '../../../../actions/book';

// functions
import { formattingDate } from '../../../../utils/utils';

const Overview = () => {
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
        let newDate = formattingDate(new Date(item.bookingdate), 'dmmy')
        item.bookingdate = newDate;
      })
      setDataAvailable(availableDate)
    }
  }, [availableDate])

  return (
    <div style={{marginTop: '3rem'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Paper sx={{ height: '11rem', width: '20rem', borderRadius: '16px', padding: '2rem', margin: '0.7rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p>Earning:</p>
              <p>$70.000</p>
            </div>
          </div>
          <div style={{marginTop: '3rem'}}>
            <Button variant="contained" color="primary" sx={{ borderRadius: '10px' }}>Download</Button>
          </div>
        </Paper>
        <Paper sx={{ height: '11rem', width: '20rem', borderRadius: '16px', padding: '2rem', margin: '0.7rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p>Earning:</p>
              <p>$70.000</p>
            </div>
          </div>
          <div style={{marginTop: '3rem'}}>
            <Button variant="contained" color="primary" sx={{ borderRadius: '10px' }}>Download</Button>
          </div>
        </Paper>
      </div>

      {/* <Paper sx={{m: '1rem',p: '1rem'}} elevation={6}>
          <Typography variant="h6" sx={{m: '1rem'}} elevation={6}>Tanggal yang sedang dibuka</Typography>
          <TableBasic header={['Tanggal', 'Jumlah Shift', 'Max / shift', 'Max Booking / HP', 'Status' ]} content={dataAvailable} />
      </Paper> */}

    </div>
  )
}

export default Overview