import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// import components
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// import actions
import { editingExistingBookDate, updateExistingBookDate, deleteDate } from '../../../../actions/dashboardMenu';

export default function BasicMenu({ icon, data }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (e) => {
    setAnchorEl(null);
    const { myValue } = (e.currentTarget.dataset)

    if(myValue==="edit"){
      dispatch(editingExistingBookDate(data))
    } else if(myValue === "closed"){
      let newObjData = {...data, available: false}
      dispatch(updateExistingBookDate(newObjData, data._id, false))
    } else if(myValue === "delete"){
      dispatch(deleteDate(data._id))
    } else {
      console.log("no action executed")
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {icon}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem data-my-value="edit" onClick={(e) => handleClose(e)}>Edit</MenuItem>
        <MenuItem data-my-value="closed" onClick={(e) => handleClose(e)}>Close</MenuItem>
        <MenuItem data-my-value="delete" onClick={(e) => handleClose(e)}>Delete</MenuItem>
      </Menu>

    </div>
  );
}