import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField, Box, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import { CustomPaper } from './styles.js';
import SnackBar from './SnackBar';

// import actions
import { getAvailableDates, makeAppointment } from '../../../actions/book';

// functions
import { phoneValidator, maxDate } from '../../../utils/utils';

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    height: 250,
}

const initialStateForm = { name: '', cellphone: '', datebook: '', sessionbook: '', bookingcode: '', dateID: ''}
const initialStateData = { bookingdate: '', dateID: '', shifts: 3, shift1: '', shift2: '', shift3: '' }

// class
const UserForm = () => {
    const dispatch = useDispatch();
    // const [dateID, setDateID] = useState('');
    const [formData, setFormData] = useState(initialStateForm);
    const [currData, setCurrData] = useState(initialStateData);
    const [isAlert, setIsAlert] = useState(false);
    const [shifts, setShifts] = useState({shift1: "", shift2: "", shift3: ""})
    const availableDate = useSelector((state) => state.books.availableDate);

    useEffect(() => {
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 1);

        dispatch(getAvailableDates(dayjs(new Date(dateNow))))
    }, [])

    useEffect(() => {
        console.log('Available in client:')
        console.log(availableDate)
        if(availableDate.length > 0){
            setCurrData({
                bookingdate: dayjs(availableDate[0]?.bookingdate), dateID: availableDate[0]?._id, shifts: availableDate[0]?.shiftInfo?.quantity, 
                shift1: availableDate[0]?.shiftInfo?.schedules[0], shift2: availableDate[0]?.shiftInfo?.schedules[1], 
                shift3: availableDate[0]?.shiftInfo?.schedules[2]
            })
        }
    }, [availableDate])

    useEffect(() => {
        setFormData({ ...formData, datebook: currData.bookingdate, dateID: currData.dateID })
        setShifts({ shift1: currData.shift1, shift2: currData.shift2, shift3: currData.shift3 })
    }, [currData])

    const handleDateChange = (e) => {
        console.log(e.target?.value)
        if(!e.target?.value){
            setIsAlert(true);
        }
        setFormData({ ...formData, datebook: e.target?.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedPhone = phoneValidator(formData.cellphone)
        // console.log(formData)
        dispatch(makeAppointment({ ...formData, cellphone: formattedPhone}, formData.dateID))
        // clear();
    }

    const isWeekend = (date) => {
        const day = date.day();
        const max = maxDate(6);
        
        return day === 0 || day === 1 || day === 6 || date > max
    };

    return (
        <CustomPaper elevation={6}>
            <SnackBar isAlert={isAlert} setIsAlert={setIsAlert} />
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
                        disablePast={true} onChange={(e) => handleDateChange(e)} renderInput={(params) => <TextField {...params}  size="small" fullWidth />}
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