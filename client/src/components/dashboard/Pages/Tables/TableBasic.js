import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

// import components
import { Paper, Table, TableCell, TableRow, TableBody, TableHead, TableContainer } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TableBasic = ({ header, content }) => {
  const [contentArr, setContentArr] = useState([])

  useEffect(() => {
    if(content){
      setContentArr(content)
    } else if (!content){
      setContentArr([])
    }
    
  }, [content])

  return (
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
          {contentArr.map((item) => (
            <TableRow
              key={item.bookingdate}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.bookingdate}
              </TableCell>
              <TableCell align="right">{item.shiftInfo.quantity}</TableCell>
              <TableCell align="right">{item.max}</TableCell>
              <TableCell align="right">{item.maxbooking}</TableCell>
              <TableCell align="right">{item.available = true ? 'open' : 'closed'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic