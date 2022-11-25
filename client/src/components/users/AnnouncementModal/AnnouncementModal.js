import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import components
import { Box, Modal, LinearProgress, Fade } from '@mui/material';
import { closeAnnouncement } from '../../../actions/announcement';
import { closeTicket } from '../../../actions/book';
import { TitleTypography, ContentTypography, NoteTypography } from './styles';

const styleBase = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '1rem',
    color: 'black',
    zIndex: 10
}

const AnnouncementModal = ({ status, title, message, isShowProgress=false, isTimeLimit, duration, ticket, isTicket }) => {
  const dispatch = useDispatch()
  const [style, setStyle] = useState(styleBase);
  const shifts = useSelector((state) => state.books.shifts)

  const handleClose = () => {
    // button close only work if no duration and when still in progress 
    // console.log("close button")
    if(!isTimeLimit && !isShowProgress){
      // console.log("close info")
      dispatch(closeAnnouncement())
      dispatch((closeTicket()))
    }
  };

  if(isTimeLimit){
      let begin = new Date().getTime();
      let beginSeconds = Math.floor(begin % (1000 * 60)) / 1000;

      let x = setInterval(() => {
        
        let end = new Date().getTime();
        let endSeconds = Math.floor(end % (1000 * 60)) / 1000;
        let distance = endSeconds - beginSeconds;
        // console.log(distance)
        if (distance > duration){
          clearInterval(x);
          // console.log("close because of time out");
          dispatch(closeAnnouncement());
        }
      })
    }

  return (
    <div>
        <Modal open={status} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Fade in={status}>
            <Box style={style}>
                {/* <Typography id="modal-modal-title" variant="h6" component="h2">{title}</Typography> */}
                <TitleTypography id="modal-modal-title" variant="h6" component="h2">{title}</TitleTypography>
                <ContentTypography id="modal-modal-description" sx={{ mt: 2 }}>{message}</ContentTypography>
                {isShowProgress && (
                  <Box sx={{ width: '100%', mt: 4 }}>
                      <LinearProgress />
                  </Box>
                )}
                {isTicket && (
                  <div>
                    <ContentTypography sx={{ mt: 2}}><span style={{color: '#A0A0A0'}}>Nama</span>: {ticket.name}</ContentTypography>
                    <ContentTypography sx={{ mt: 1}}><span style={{color: '#A0A0A0'}}>No HP</span>: 0{ticket.cellphone}</ContentTypography>
                    <ContentTypography sx={{ mt: 1}}><span style={{color: '#A0A0A0'}}>Tanggal</span>: {ticket.bookingdate}</ContentTypography>
                    <ContentTypography sx={{ mt: 1}}><span style={{color: '#A0A0A0'}}>Jam</span>: {ticket.shift}</ContentTypography>
                    <ContentTypography sx={{ mt: 1}}><span style={{color: '#A0A0A0'}}>No urut</span>: {ticket.index + 1}</ContentTypography>
                    <ContentTypography sx={{ mt: 4}}>Harap screencapture dan simpan pesan ini</ContentTypography>
                    <NoteTypography sx={{ mt: 1}}>booked at {ticket.timestamp}</NoteTypography>
                  </div>
                )}
            </Box>
          </Fade>
        </Modal>
    </div>
  )
}

export default AnnouncementModal;