import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { Paper, Typography, Button, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

// import actions
import { createBook } from '../../../../../actions/dashboardMenu';
import { getAvailableDates } from '../../../../../actions/book';

// initial state
const initialState = {
    newdatebook: '', capacitybook: 20, maxbooking: 2, shifts: 3, schedule: ['10:00 - 12:00', '14:00 - 16:00', '18:00 - 20:00']
}

const NewBookingDate = () => {
  const dispatch = useDispatch();
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);
  
  const [formNewDate, setFormNewDate] = useState({...initialState, newdatebook: dayjs(dateNow)});
  const [dataAvailable, setDataAvailable] = useState('');
  const [shiftArr, setShiftArr] = useState([]);
  const availableDate = useSelector((state) => state.books?.availableDate);

  useEffect(() => {
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate());

    dispatch(getAvailableDates(dayjs(new Date(dateNow))))
  }, [])

  useEffect(() => {
    const tempArr=[]
    for (let i = 0; i < formNewDate.shifts ; i++){
        tempArr.push(`shift${i+1}`)
    }
    
    setShiftArr(tempArr)
  }, [formNewDate.shifts])

  useEffect(() => {
    if(availableDate){
      availableDate.map((item) => console.log(item))
        setDataAvailable({
          ...dataAvailable, bookingdate: availableDate.bookingdate, max: availableDate.max, shifts: 3, maxbooking: availableDate.maxbooking, 
          id: availableDate._id
        })
    }
  }, [availableDate])

  const handleDateChange = (newValue) => {
    setFormNewDate({ ...formNewDate, newdatebook: newValue})
  };

  const handleSubmit = (e) => {
    console.log("Handle Submit");
    e.preventDefault();
    dispatch(createBook({ ...formNewDate }))
    console.log(formNewDate)
    clear();
  }

  const clear = () => {
    setFormNewDate({...initialState, newdatebook: dayjs(dateNow)})
  }

  return (
    <Paper sx={{ m: '1rem', p: '1rem', pb: '0.5rem' }} elevation={6}>
        <Typography variant="h6" sx={{m: '1rem', mt: '0' }} elevation={6}>Buka tanggal baru</Typography>
        <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: '40vw'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                <MobileDatePicker label="Open New Date" name="newdatebook" inputFormat="DD/MMM/YYYY dddd" value={formNewDate.newdatebook}
                    onChange={handleDateChange} renderInput={(params) => <TextField {...params} required={true} size="small" />}
                />
            </LocalizationProvider>
            <TextField name="shifts" label="Jumlah Shift" type="number" min={1} max={3} value={formNewDate.shifts} required={true} size="small"
                InputLabelProps={{ shrink: true, }}  sx={{ my: '1rem' }}
                onChange={(e)=> setFormNewDate({ ...formNewDate, shifts: e.target.value, schedule: formNewDate.schedule.map((time, i) => {
                    if(i >= e.target.value) return;
                    return time
                }) })} 
            />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {shiftArr.map((item, ind) => (
                    <TextField name={`${item}Cap`} label={`Jam ${item}`} type="string" size="small" value={formNewDate.schedule[ind]}
                        onChange={(e)=> setFormNewDate({ ...formNewDate, schedule: formNewDate.schedule.map((time, i) => {
                            if(i == ind) return e.target.value
                            return time
                        }) })} 
                        InputLabelProps={{ shrink: true }} key={`shiftTable${ind}`}
                    />
                ))}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
              <TextField
                  name="capacitybook" label="Kapasitas per shift" type="number" value={formNewDate.capacitybook} required={true} size="small"
                  InputLabelProps={{ shrink: true }} onChange={(e)=> setFormNewDate({ ...formNewDate, capacitybook: e.target.value })} 
                  sx={{ my: '1rem', width: '100%' }}
              />
              <TextField name="maxbooking" label="Max booking per no HP" type="number" value={formNewDate.maxbooking} required={true} size="small"
                  onChange={(e)=> setFormNewDate({ ...formNewDate, maxbooking: e.target.value })} InputLabelProps={{ shrink: true, }} 
                  sx={{ my: '1rem', width: '100%' }}
              />
            </div>
            <Button variant="contained" color="primary" size="large" type="submit" sx={{ my: '1rem' }} fullWidth>Submit</Button>
        </form>
    </Paper>
  )
}

export default NewBookingDate