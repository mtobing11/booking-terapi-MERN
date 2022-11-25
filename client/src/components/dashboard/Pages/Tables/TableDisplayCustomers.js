import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// import components
import { Paper, Table, TableCell, TableRow, TableBody, TableHead, TableContainer, Typography } from '@mui/material';

//functions
import { formattingDate } from '../../../../utils/utils';

const TableDisplayCustomers = ({ title, header, content, date }) => {
  const [contentArr, setContentArr] = useState([])

  useEffect(() => {
    if(content){
      setContentArr(content)
    }
  }, [content])

  // useEffect(() => {console.log(contentArr)}, [contentArr])

  const formatDateFromString = (dateString, typeFormat) => {
    let tempDate = dayjs(dateString);
    // let tempDate1 = formatDateToIndonesian(tempDate)
    let tempDate1 = formattingDate(new Date(tempDate), typeFormat)
    
    return tempDate1
  }

  return (
    <div>
      <Typography variant="h4" sx={{mt: '2.5rem', textTransform: 'capitalize'}}>{title}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {header.map((head, ind) => (
                ind == 0 ? <TableCell align="left" key={`tablehead${ind}`}>{head}</TableCell> : <TableCell align="right" key={`tablehead${ind}`}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contentArr.map((item, idx) => (
              <TableRow key={`${idx}-${idx}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {formatDateFromString(date, "dmmy-time")}
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.cellphone}</TableCell>
                <TableCell align="right">{title}</TableCell>
                <TableCell align="right">{idx + 1}</TableCell>
                <TableCell align="right">{formatDateFromString(item.timestamp)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableDisplayCustomers