import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePhone } from '@fortawesome/free-solid-svg-icons';

export default function FloatingActionButtons() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        <FontAwesomeIcon icon={faSquarePhone} />
      </Fab>
      {/* <Fab color="secondary" aria-label="edit">
        <FontAwesomeIcon icon={faPhoneSquare} />
      </Fab>
      <Fab variant="extended">
        <FontAwesomeIcon icon={faPhoneSquare} />
        Navigate
      </Fab>
      <Fab disabled aria-label="like">
        <FontAwesomeIcon icon={faPhoneSquare} />
      </Fab> */}
    </Box>
  );
}