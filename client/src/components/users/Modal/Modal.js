import React from 'react';

// import components
import { Box, Button, Typography, Modal, LinearProgress } from '@mui/material';

const Modal = () => {
  return (
    <>
        <Modal aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2"></Typography>
                <Typography sx={{ mt: 2}}></Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
                <Box sx={{ width: '100%', mt: 4 }}>
                    <LinearProgress />
                </Box>
            </Box>
        </Modal>
    </>
  )
}

export default Modal