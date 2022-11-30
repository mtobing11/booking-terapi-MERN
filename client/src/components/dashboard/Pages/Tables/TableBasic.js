import React, { useState, useEffect } from 'react';

// import components
import { Paper, Table, TableCell, TableRow, TableBody, TableHead, TableContainer, Button, Menu, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import BasicMenu from './BasicMenu';

// functions
import { formattingDate, sortDateArr } from '../../../../utils/utils';

const TableBasic = ({ header, content }) => {
  const [contentArr, setContentArr] = useState([])

  useEffect(() => {
    if(content){
      let tempArr = [...content];
      setContentArr(sortDateArr(tempArr))
    } else if (!content){
      setContentArr([])
    }
    let tempArr = [...content]
  }, [content])


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((head, ind) => (
              ind === 0 ? <TableCell align="left" key={`tablehead${ind}`}>{head}</TableCell> : 
              ind === 5 ? <TableCell align="center" key={`tablehead${ind}`}>{head}</TableCell> : 
              <TableCell align="right" key={`tablehead${ind}`}>{head}</TableCell>
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
                {formattingDate(new Date(item.bookingdate), 'dmmy')}
              </TableCell>
              <TableCell align="right">{item.shiftInfo.quantity}</TableCell>
              <TableCell align="right">{item.max}</TableCell>
              <TableCell align="right">{item.maxbooking}</TableCell>
              <TableCell align="right">{item.available === true ? 'open' : 'closed'}</TableCell>
              <TableCell align="left">{item.shiftInfo.schedules.join(" // ")}</TableCell>
              <TableCell align="right">
                <BasicMenu icon={<FontAwesomeIcon icon={faGripVertical} />} data={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic