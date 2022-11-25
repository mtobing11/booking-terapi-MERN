import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, Box, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import { CustomPaper } from './styles.js';

// import actions
import { getAvailableDates, makeAppointment } from '../../../actions/book';

// functions
import { phoneValidator } from '../../../utils/utils';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    height: 250,
}

// class
const UserForm = () => {
    const dispatch = useDispatch();
    const [dateID, setDateID] = useState('');
    const [formData, setFormData] = useState({ name: '', cellphone: '', datebook: '', sessionbook: '', bookingcode: ''});
    const [shifts, setShifts] = useState({shift1: "", shift2: "", shift3: ""})
    const availableDate = useSelector((state) => state.books?.availableDate);

    useEffect(() => {
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 1);

        dispatch(getAvailableDates(dayjs(new Date(dateNow))))
    }, [])

     useEffect(() => {
        // console.log(availableDate)
        if(availableDate.length > 0){
            setFormData({ ...formData, datebook: dayjs(availableDate[0].bookingdate)})
            setDateID(availableDate[0]._id)

            let shiftsSchedule = availableDate[0].shiftInfo.schedules
            setShifts({ ...shifts, shift1: shiftsSchedule[0], shift2: shiftsSchedule[1], shift3: shiftsSchedule[2] })
        } else {
            setFormData({ ...formData, datebook: ''})
        }
    }, [availableDate])

    const handleChange = (newValue) => {
        setFormData({ ...formData, datebook: newValue})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedPhone = phoneValidator(formData.cellphone)
        // console.log(formData)
        dispatch(makeAppointment({ ...formData, cellphone: formattedPhone}, dateID))
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
                        <MenuItem value="shift1">{shifts.shift1}</MenuItem>
                        {shifts.shift2 && (
                            <MenuItem value="shift2">{shifts.shift2}</MenuItem>
                        )}
                        {shifts.shift3 && (
                            <MenuItem value="shift3">{shifts.shift3}</MenuItem>
                        )}
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
            </form>
        </CustomPaper>
    )
}

export default UserForm