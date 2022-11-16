import React, { useState } from 'react';
import dayjs from 'dayjs';

// import components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, Box, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import { CustomPaper } from './styles.js';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    height: 250,
}

const UserForm = () => {
    
    const [formData, setFormData] = useState({ name: '', cellphone: '', datebook: '', sessionbook: '', bookingcode: ''});
    const handleChange = (newValue) => {
        setFormData({ ...formData, datebook: newValue})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit")
        // dispatch(makeAppointment({ ...formData}, dateID, history))
        // clear();
    }

    const isWeekend = (date) => {
        const day = date.day();

        return day === 0 || day === 1 || day === 6
    };

    return (
        <CustomPaper elevation={6}>
            <form autoComplete='off' noValidate onSubmit={handleSubmit} style={style}>
                <TextField name="name" label="Nama" variant="outlined" required={true} size="small"
                    fullWidth value={formData.name} onChange={(e)=> setFormData({ ...formData, name: e.target.value })} 
                />
                <TextField name="cellphone" variant="outlined" required={true}  size="small"
                    fullWidth label="No Hp" value={formData.cellphone} onChange={(e)=>setFormData({ ...formData, cellphone: e.target.value })} 
                />
                <LocalizationProvider dateAdapter={AdapterDayjs} fullWidth>
                    <MobileDatePicker label="Tanggal datang"
                        name="datebook" inputFormat="DD/MMM/YYYY" value={formData.datebook} shouldDisableDate={isWeekend} disabled={true} 
                        disablePast={true} onChange={handleChange} renderInput={(params) => <TextField {...params}  size="small" fullWidth />}
                    />
                </LocalizationProvider>
                <Box sx={{ width: 1 }}>
                    <FormControl fullWidth>
                        <InputLabel id="sessionbook" size="small">Pilih Jam Kunjungan</InputLabel>
                        <Select
                            labelId="sessionbook" name="sessionbook" id="sessionbookId" required={true}  size="small"
                            value={formData.sessionbook} label="Pilih jam kunjungan" onChange={(e)=>setFormData({ ...formData, sessionbook: e.target.value })}
                        >
                        <MenuItem value="shift1">10.30 - 12.30</MenuItem>
                        <MenuItem value="shift2">15.00 - 17.00</MenuItem>
                        <MenuItem value="shift3">19.00 - 21.00</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
            </form>
        </CustomPaper>
    )
}

export default UserForm