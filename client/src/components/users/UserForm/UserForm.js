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

const style = {
    display: 'flex',
    flexWrap: 'wrap',
    height: 250,
}

const phoneValidator = (phone) =>{
    let standardNumber = standardizePhoneNumber(phone)
    if (isCorrectFormat(standardNumber) && cellularProviderInIndonesia(standardNumber)){
        return standardNumber
    }
    return null
}

const standardizePhoneNumber = (phone) => {
    let phoneNumber = String(phone).trim();

    if(phoneNumber.startsWith('+62')){
        phoneNumber = '0' + phoneNumber.slice(3);
    } else if (phoneNumber.startsWith('62')){
        phoneNumber = '0' + phoneNumber.slice(2)
    }

    return phoneNumber.replace(/[- .]/g, "");
}

const isCorrectFormat = (phone) => {
    if(!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)){
        return false
    }
    return true
}

const cellularProviderInIndonesia = (phone) =>{
    const prefix = phone.slice(0, 4);
    if (['0831', '0832', '0833', '0838'].includes(prefix)) return 'axis';
    if (['0895', '0896', '0897', '0898', '0899'].includes(prefix)) return 'three';
    if (['0817', '0818', '0819', '0859', '0878', '0877'].includes(prefix)) return 'xl';
    if (['0814', '0815', '0816', '0855', '0856', '0857', '0858'].includes(prefix)) return 'indosat';
    if (['0812', '0813', '0852', '0853', '0821', '0823', '0822', '0851', '0811'].includes(prefix)) return 'telkomsel';
    if (['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'].includes(prefix)) return 'smartfren';
    if (['0840'].includes(prefix)) return 'untuk_percobaan';
    return null;
}

const UserForm = () => {
    const dispatch = useDispatch();
    const [dateID, setDateID] = useState('');
    const [formData, setFormData] = useState({ name: '', cellphone: '', datebook: '', sessionbook: '', bookingcode: ''});
    const availableDate = useSelector((state) => state.books.availableDate);

    useEffect(() => {
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 1);

        dispatch(getAvailableDates(dayjs(new Date(dateNow))))
    }, [])

     useEffect(() => {
        if(availableDate){
            setFormData({ ...formData, datebook: dayjs(availableDate[0].bookingdate)})
            setDateID(availableDate[0]._id)
        }
    }, [availableDate])

    const handleChange = (newValue) => {
        setFormData({ ...formData, datebook: newValue})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedPhone = phoneValidator(formData.cellphone)
        console.log("handleSubmit")
        console.log(formData)
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