import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { Paper, Typography, Button, TextField, Box } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

// import actions
import { createBook, getInitialSetup, updateExistingBookDate } from '../../../../../actions/dashboardMenu';

// functions
import { formattingDate } from '../../../../../utils/utils'

// initial state
const initialState = {
    newdatebook: '', capacitybook: 22, maxbooking: 2, shifts: 3, schedule: ['10:30 - 12:30', '15:00 - 14:00', '19:00 - 21:00']
}


const NewBookingDate = () => {
  const id = "637d11df564a6ec83703ce95";
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const editRef = useRef();
  const dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 1);
  
  const [formNewDate, setFormNewDate] = useState({...initialState, newdatebook: dayjs(dateNow), creator: user?.userData?.name});
  const [shiftArr, setShiftArr] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dateForDialog, setDateForDialog] = useState(formattingDate(new Date(dateNow), 'dmmy-time'));
  const initialSetup = useSelector((state) => state.dashboard?.initialSetup);
  const existingBookID = useSelector((state) => state.dashboard?.existingBookID)

  useEffect(() => {
    dispatch(getInitialSetup(id));
    console.log(dateForDialog)
  }, [])

  useEffect(() => {
    const tempArr=[]
    for (let i = 0; i < formNewDate.shifts ; i++){
        tempArr.push(`shift${i+1}`)
    }
    
    setShiftArr(tempArr)
  }, [formNewDate.shifts])

  useEffect(() => {
    if(initialSetup){
      setFormNewDate({
        ...formNewDate, capacitybook: initialSetup.max, maxbooking: initialSetup.maxbooking, shifts: initialSetup.shifts, bookingdate: initialSetup?.bookingdate,
        schedule: initialSetup.schedules.map((s) => {
          return s.schedule
        })
      })
    }
    
  }, [initialSetup])

  useEffect(() => {
    if(existingBookID){
      editRef.current.focus()
    }
  }, [existingBookID])

  const handleSubmit = (e) => {
    e.preventDefault();
    setDialogOpen(false);
    if(existingBookID){
      dispatch(updateExistingBookDate( formNewDate, existingBookID, true))
    } else {
      dispatch(createBook({ ...formNewDate }))
    }
    clear();
  }

  const clear = () => {
    setFormNewDate({...initialState, newdatebook: dayjs(dateNow)})
  }

  const handleDateChange = (newValue) => {
    setDateForDialog(formattingDate(new Date(newValue), 'dmmy-time'))
    setFormNewDate({ ...formNewDate, newdatebook: newValue})
  };

  const handleScheduleChange = (e, idx) => {
    let tempArr = [...formNewDate.schedule];
    tempArr[idx] = e.target.value;
    
    setFormNewDate({...formNewDate, schedule: tempArr})
  }

  return (
    <Paper sx={{ m: '1rem', p: '1rem', pb: '0.5rem' }} elevation={6}>
        {existingBookID ? (
          <Box sx={{ backgroundColor: '#ffc107'}}>
            <Typography variant="h6" sx={{m: '1rem', mt: '0' }} elevation={6}>Edit Tanggal Yang Ada</Typography>
          </Box>
        ) : (
          <Typography variant="h6" sx={{m: '1rem', mt: '0' }} elevation={6}>Buka Tanggal Baru</Typography>
        )}
        {/* <Typography variant="h6" sx={{m: '1rem', mt: '0' }} elevation={6}>{existingBookID ? 'Edit Tanggal Yang Ada': 'Buka tanggal baru'}</Typography> */}
        <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: '40vw'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
              {existingBookID ? (
                <MobileDatePicker label="Open New Date" name="newdatebook" inputFormat="DD/MMM/YYYY dddd" value={formNewDate.bookingdate}
                    onChange={handleDateChange} renderInput={(params) => <TextField {...params} required={true} size="small" />}  disabled={true}
                />
              ) : (
                <MobileDatePicker label="Open New Date" name="newdatebook" inputFormat="DD/MMM/YYYY dddd" value={formNewDate.newdatebook}
                    onChange={handleDateChange} renderInput={(params) => <TextField {...params} required={true} size="small" />}
                />
              )}
            </LocalizationProvider>
            <TextField name="shifts" label="Jumlah Shift" type="number" min={1} max={3} value={formNewDate.shifts} required={true} size="small"
                InputLabelProps={{ shrink: true, }}  sx={{ my: '1rem' }} autoFocus={true} inputRef={editRef}
                onChange={ (e)=> setFormNewDate({ ...formNewDate, shifts: e.target.value }) } 
            />
            <div style={{display: 'flex', justifyContent: 'flex-start', gap: '0.5rem'}}>
                {shiftArr.map((item, ind) => (
                    ind < 3 ? (<TextField name={`${item}Cap`} label={`Jam ${item}`} type="string" size="small" value={formNewDate.schedule[ind]}
                        onChange={(e)=> handleScheduleChange(e, ind)} 
                        InputLabelProps={{ shrink: true }} key={`shiftTable${ind}`}
                    />) : null
                ))}
            </div>

            {/* shedule shift */}
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
            
            <Button variant="contained" color="primary" size="large" sx={{ my: '1rem' }} onClick={() => setDialogOpen(true)}>Want to Submit?</Button>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
              <DialogTitle id='dialog-title'>Confirm?</DialogTitle>
              <DialogContent>
                <DialogContentText id='dialog-description'>
                  Date: {existingBookID ? formattingDate(new Date(formNewDate.bookingdate), 'dmmy-time') :dateForDialog} <br/>
                  Total Shifts: {formNewDate.shifts} shift<br/>
                  Maksimal per shift: {formNewDate.capacitybook} orang<br/>
                  Maksimal no HP: {formNewDate.maxbooking} kali/nomer
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="warning" size="large" sx={{ my: '1rem' }} fullWidth onClick={() => setDialogOpen(false)}>No</Button>
                <Button variant="contained" color="primary" size="large" type="submit" sx={{ my: '1rem' }} fullWidth onClick={handleSubmit}>Yes</Button>
              </DialogActions>
            </Dialog>
            {/* <Button variant="contained" color="primary" size="large" type="submit" sx={{ my: '1rem' }} fullWidth>Submit</Button> */}
        </form>
    </Paper>
  )
}

export default NewBookingDate