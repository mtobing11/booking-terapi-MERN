import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import components
import { Paper, TextField, Button, TextareaAutosize, Box, InputLabel, MenuItem, FormControl, Select, } from '@mui/material';
import Header from '../Header/Header';

// import action
import { fetchAnnouncement, createAnnouncement, updateAnnouncement } from '../../../../actions/announcement';
import { maxWidth } from '@mui/system';

const AnnounceControl = () => {
  const announcementID = '63736bef3dda6cf66d20d536';
  const dispatch = useDispatch();
  const [announceData, setAnnounceData] = useState({ message: '', duration: '', status: ''});
  const fetchAnnounceData = useSelector((state) => state.announcements.announceDataForAdmin);
  const isAnnounce = useSelector((state) => state.announcements?.isAnnounce);

  useEffect(() => {
    dispatch(fetchAnnouncement(announcementID))
  }, [])

  useEffect(() => {
    console.log(fetchAnnounceData)
    if(fetchAnnounceData){
      setAnnounceData({ message: fetchAnnounceData.message, duration: fetchAnnounceData.duration, status: fetchAnnounceData.status})
    }
  }, [fetchAnnounceData])

  const handleSubmit = (e) => {
    console.log("Handle Submit");
    // e.preventDefault();
    dispatch(updateAnnouncement({ ...announceData}, announcementID))
  }

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', p: '1.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Annoucement Message" />
        <Paper sx={{m: '1rem',p: '1rem'}} elevation={6}>
          <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: '40vw'}}>
            <TextareaAutosize  minRows={4} maxRows={8} name="message" label="Message to display" type="string" value={announceData.message}
              InputLabelProps={{ shrink: true }}  sx={{ my: '1rem' }} required={true} style={{ fontSize: 20, padding: 10}}
              onChange={(e)=> setAnnounceData({ ...announceData, message: e.target.value })}
            />
            <TextField name="duration" label="Durasi (detik)" type="number" value={announceData.duration} required={true} size="small"
                InputLabelProps={{ shrink: true, }}  sx={{ my: '1rem', maxWidth: '200px'}}
                onChange={ (e)=> setAnnounceData({ ...announceData, duration: e.target.value }) } 
            />
            <Box sx={{ width: 1, maxWidth: '200px', mb: '1rem' }}>
                <FormControl fullWidth>
                    <InputLabel id="announcementStatus" size="small">Open / Close Message?</InputLabel>
                    <Select
                        labelId="announcementStatus" name="announcementStatus" id="announcementStatusId" required={true} size="small"
                        value={announceData.status} label="Pilih jam kunjungan" onChange={(e)=>setAnnounceData({ ...announceData, status: e.target.value })}
                    >
                    <MenuItem value={true}>Open Message</MenuItem>
                    <MenuItem value={false}>Close Message</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
          </form>
        </Paper>
    </Paper>
  )
}

export default AnnounceControl