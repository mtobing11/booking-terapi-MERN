import React from 'react';

// import component
import { Grow, Container, Grid, Card, CardMedia } from '@mui/material';
import FrontTitle from '../FrontTitle/FrontTitle';
import UserForm from '../UserForm/UserForm';
import image from '../../../data/terapi_ketok_kevin_01.jpg';

const Home = () => {
  return (
    <Grow in>
        <Card>
            <CardMedia image={image}>
                <Container maxWidth="sm" sx={{padding: 10, zIndex: 5}}>
                    <Grid sx={{marginBottom: 10}}>
                        <FrontTitle />
                    </Grid>
                    <Grid>
                        <UserForm />
                    </Grid>
                </Container>
            </CardMedia>
        </Card>
    </Grow>
  )
}

export default Home