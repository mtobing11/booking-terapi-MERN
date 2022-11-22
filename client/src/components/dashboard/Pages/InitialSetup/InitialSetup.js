import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// import components
import { Paper, TextField, Button } from '@mui/material';
import Header from '../Header/Header';

// import actions
import { createInitialSetup, updateInitialSetup } from '../../../../actions/dashboardMenu';

// initial states
const setup = {  
    max: 20, 
    maxbooking: 1, 
    shifts: 3, 
    schedules: [
        {shiftName: 'shift1', schedule: '', status: true}, 
        {shiftName: 'shift2', schedule: '', status: true}, 
        {shiftName: 'shift3', schedule: '', status: true}
    ] }

const InitialSetup = () => {
  const id = "637d11df564a6ec83703ce95";
  const dispatch = useDispatch();
  const [dataSetup, setDataSetup] = useState(setup);

  const handleSubmit = (e) => {
    console.log("Handle Submit");
    e.preventDefault();
    dispatch(updateInitialSetup(id, { ...dataSetup }))
    // dispatch(createInitialSetup({ ...dataSetup }))
    // console.log(formNewDate)
    clear();
  }

  const handleChange = (e, idx) => {
    let tempArr = [...dataSetup.schedules];
    let obj = tempArr[idx];
    obj.schedule = e.target.value;
    tempArr[idx] = obj
    setDataSetup({...dataSetup, schedules: tempArr})
  }

  const clear = () => {
    setDataSetup(setup)
  }

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', p: '0.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Initial Setup" />
        <Paper sx={{ m: '1rem', p: '1rem', pb: '0.5rem' }} elevation={6}>
            <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: '40vw'}}>
                <TextField name="max" label="Max booking per shift" type="number" value={dataSetup.max} required={true} size="small"
                  onChange={(e)=> setDataSetup({ ...dataSetup, max: e.target.value })} InputLabelProps={{ shrink: true, }} 
                  sx={{ mt: '1rem', mb: '0.5rem', width: '100%' }}
                />
                <TextField name="maxbooking" label="Max booking per no HP" type="number" value={dataSetup.maxbooking} required={true} size="small"
                  onChange={(e)=> setDataSetup({ ...dataSetup, maxbooking: e.target.value })} InputLabelProps={{ shrink: true, }} 
                  sx={{ my: '0.5rem', width: '100%' }}
                />
                <TextField name="shifts" label="Jumlah Shift" type="number" value={dataSetup.shifts} required={true} size="small"
                  onChange={(e)=> setDataSetup({ ...dataSetup, shifts: e.target.value })} InputLabelProps={{ shrink: true, }} 
                  sx={{ my: '0.5rem', width: '100%' }}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                    <TextField name="shift1" label="Schedule Shift 1" type="string" value={dataSetup.schedules[0].schedule} required={true} size="small"
                        onChange={(e) => handleChange(e, 0)}
                        InputLabelProps={{ shrink: true, }} sx={{ my: '0.5rem', width: '100%' }}
                    />
                    <TextField name="shift2" label="Schedule Shift 2" type="string" value={dataSetup.schedules[1].schedule} required={true} size="small"
                        onChange={(e) => handleChange(e, 1)}
                        InputLabelProps={{ shrink: true, }} sx={{ my: '0.5rem', width: '100%' }}
                    />
                    <TextField name="shift3" label="Schedule Shift 3" type="string" value={dataSetup.schedules[2].schedule} required={true} size="small"
                        onChange={(e) => handleChange(e, 2)}
                        InputLabelProps={{ shrink: true, }} sx={{ my: '0.5rem', width: '100%' }}
                    />
                </div>
                <Button variant="contained" color="primary" size="large" type="submit" sx={{ my: '1rem' }} fullWidth>Submit</Button>
            </form>
        </Paper>
        
    </Paper>
  )
}

export default InitialSetup