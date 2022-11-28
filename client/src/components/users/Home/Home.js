import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import component
import { Grow, Container, Grid, CardMedia, Paper, Avatar } from '@mui/material';
import FrontTitle from '../FrontTitle/FrontTitle';
import Footer from '../Footer/Footer';
import UserForm from '../UserForm/UserForm';
import AnnouncementModal from '../AnnouncementModal/AnnouncementModal';
import WhatsApp from './WhatsApp';
import image from '../../../data/terapi_ketok_kevin_01.jpg';
import whatsApp from '../../../data/WhatsApp.png';

// import action
import { fetchAnnouncement } from '../../../actions/announcement';

const Home = () => {
    const dispatch = useDispatch();
    const [announceData, setAnnounceData] = useState({ message: '', duration: ''});
    const [ticketData, setTicketData] = useState({ name: '', cellphone: '', bookingcode: '', bookingdate: '', index: '', shift: '', timestamp: '', id: '' });
    const [isTimeLimit, setIsTimeLimit] = useState(false);
    const [isShowProgress, setIsShowProgress] = useState(false);
    const fetchAnnounceData = useSelector((state) => state.announcements.announceData[0]);
    const fetchTicketData = useSelector((state) => state.books.ticketData);
    const [title, setTitle] = useState("Info");
    const isAnnounce = useSelector((state) => state.announcements.isAnnounce);
    const arrAnnounce = useSelector((state) => state.announcements.announceData.length);
    const isCreateTicket = useSelector((state) => state.books.isCreateTicket);
    const shifts = useSelector((state) => state.books.shifts);
    const announcementID = '63736bef3dda6cf66d20d536';

    useEffect(() => {
        dispatch(fetchAnnouncement(announcementID))
    }, [])

    useEffect(() => {
        if(fetchTicketData){
            let schedule = handleShiftToTime(fetchTicketData.shift);
            
            setTicketData({
                ...ticketData,
                name: fetchTicketData.name, 
                cellphone: fetchTicketData.cellphone, 
                bookingcode: fetchTicketData.bookingcode, 
                bookingdate: fetchTicketData.bookingdate,
                index: fetchTicketData.index, 
                shift: schedule, 
                timestamp: fetchTicketData.timestamp, 
                id: fetchTicketData.id
            })
        }
    }, [isCreateTicket])

    useEffect(() => {
        if(fetchAnnounceData){
            let announcementType = fetchAnnounceData.type;
            setAnnounceData({...announceData, message: fetchAnnounceData.message, duration: fetchAnnounceData.duration})
            setIsTimeLimit(fetchAnnounceData.isTimeLimit);
            setIsShowProgress(fetchAnnounceData.isShowProgress);

            switch(announcementType){
                case 'opening':
                    return setTitle("Selamat Datang")
                case 'err_data':
                    return setTitle("Mohon Maaf")
                case 'info':
                    return setTitle("Silahkan Tunggu")
                default:
                    return setTitle("Info..")
            }
        } else {
            setIsTimeLimit(false);
            setIsShowProgress(false);
        }

        
    }, [arrAnnounce]);

    const handleShiftToTime = (shift) => {
        let schedule = shift === 'shift1' ? shifts[0] : 'shift2' ? shifts[1] : 'shift3' ? shifts[2] : 'something wrong';
        return schedule 
    }

    return (
        <Grow in>
            <CardMedia image={image}>
                <Container maxWidth="sm" sx={{padding: 10, position: 'relative'}} style={{ }}>
                        <Avatar src={whatsApp} variant='square' sx={{ position: 'absolute', right: '0', bottom: '35%', zIndex: 100, width:'60px', height: '60px' }}/>
                    <Grid sx={{marginBottom: 10}}>
                        <FrontTitle />
                    </Grid>
                    <Grid>
                        <UserForm />
                    </Grid>
                    <Grid>
                        <Footer />
                    </Grid>
                    <Paper>
                        {isAnnounce && (
                            <AnnouncementModal status={isAnnounce} title={title} message={announceData.message} isShowProgress={isShowProgress}
                            isTimeLimit={isTimeLimit} duration={announceData.duration} />
                        )}
                        {isCreateTicket && (
                            <AnnouncementModal status={isCreateTicket} title="Booking Anda Berhasil" ticket={ticketData} isTimeLimit={false} isTicket={true} isShowProgress={false} />
                        )}
                    </Paper>
                </Container>
            </CardMedia>
        </Grow>
    )
}

export default Home