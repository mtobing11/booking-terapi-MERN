import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

// import components
import { Paper, TextField, Button } from '@mui/material';
import Header from '../Header/Header';
import Table from '../Tables/TableDisplayCustomers';

// import actions
import { getCustomers } from '../../../../actions/dashboardMenu';

// functions
import { sortDateArr, formattingDate } from '../../../../utils/utils'

const DisplayCustomersToday = () => {
    const dispatch = useDispatch();
    const [dataCustomers, setDataCustomers] = useState([])
    const dataFetchCustomers = useSelector((state) => state.dashboard?.dataCustomers);
    const [date, setDate] = useState("")
    const arrDates = useSelector((state) => state.dashboard?.dates)

    useEffect(() => {
        if(arrDates.length > 0){
            getDataCustomers()
        }
    }, [arrDates])

    // useEffect(() => {
    //     if(dataFetchCustomers){
    //         setDataCustomers([dataFetchCustomers[0]?.shift1, dataFetchCustomers[0]?.shift2, dataFetchCustomers[0]?.shift3])
    //     }
    // }, [dataFetchCustomers])

    const getDataCustomers = () => {
        let copyArr = [...arrDates];
        let arrangeArr = sortDateArr(copyArr);

        arrangeArr = arrangeArr.filter((item) => formattingDate(new Date(), 'ymd') == formattingDate(new Date(item.bookingdate), 'ymd'))
        
        let shiftNum = arrangeArr[0]?.shiftInfo.quantity;
        let tempArr = [];
        for (let i = 0; i < shiftNum; i++){
            let shiftName = `shift${i+1}`
            if(i < shiftNum){
                tempArr.push(arrangeArr[0][shiftName])
            }
        }
        
        setDataCustomers(tempArr);
        setDate(arrangeArr[0]?.bookingdate);
    }

    return (
        <Paper elevation={1} sx={{ m: '0.75rem', p: '1.5rem', borderRadius: '1.5rem' }}>
            <Header category="Page" title="Customer Hari Ini" />
            {dataCustomers.map((shift, idx) => (
                <Table title={`shift ${idx+1}`} date={date} header={['Tanggal', 'Nama', 'No HP', 'Shift', 'No urut', 'booked at' ]} content={shift} key={`shift-${idx+1}`} />
            ))}
        </Paper>
    )
}

export default DisplayCustomersToday