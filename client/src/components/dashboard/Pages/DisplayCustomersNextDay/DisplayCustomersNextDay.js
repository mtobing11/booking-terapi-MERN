import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { Paper, TextField, Button } from '@mui/material';
import Header from '../Header/Header';
import Table from '../Tables/TableDisplayCustomers';

// import actions
import { getCustomers } from '../../../../actions/dashboardMenu';

const DisplayCustomersNextDay = () => {
    const dispatch = useDispatch();
    const [dataCustomers, setDataCustomers] = useState([])
    const dataFetchCustomers = useSelector((state) => state.dashboard?.dataCustomers);

    useEffect(() => {
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 1);
        dispatch(getCustomers(dayjs(new Date(dateNow))));
    }, [])

    useEffect(() => {
        if(dataFetchCustomers){
            if(dataFetchCustomers.length > 0 && dayjs(new Date) < dayjs(dataFetchCustomers[0].bookingdate)){
                setDataCustomers([dataFetchCustomers[0]?.shift1, dataFetchCustomers[0]?.shift2, dataFetchCustomers[0]?.shift3])
            }
        }
    }, [dataFetchCustomers])

    return (
        <Paper elevation={1} sx={{ m: '0.75rem', p: '1.5rem', borderRadius: '1.5rem' }}>
            <Header category="Page" title="Customer Untuk Besok" />
            {dataCustomers.map((shift, idx) => (
                <Table title={`shift ${idx+1}`} date={dataFetchCustomers[0]?.bookingdate} header={['Tanggal', 'Nama', 'No HP', 'Shift', 'No urut', 'booked at' ]} content={shift} key={`shift-${idx+1}`} />
            ))}
        </Paper>
    )
}

export default DisplayCustomersNextDay