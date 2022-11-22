import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            size="small"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
        />
        {/* <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            size="small"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === 'password' ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> }
                        </IconButton>
                    </InputAdornment>
                ),
            } : null} 
        /> */}
    </Grid>
  )
}

export default Input