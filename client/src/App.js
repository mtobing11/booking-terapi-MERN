import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import components
import Home from '../src/components/users/Home/Home';
import Dashboard from './components/dashboard/FixComponents/Dashboard/Dashboard';
import Overview from './components/dashboard/Pages/Overview/Overview';
import BookingDateControl from './components/dashboard/Pages/BookingDateControl/BookingDateControl';
import Auth from './components/dashboard/Pages/Auth/Auth';
import InitialSetup from './components/dashboard/Pages/InitialSetup/InitialSetup';
// import Announce from '../src/components_dashboard/Announce/Announce'; 

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={(<Dashboard />)}>
                {/* <Route path="/dashboard" element={<Dashboard />}> */}
                    <Route index element={<Overview />}/>
                    <Route path="overview" element={<Overview />}/>
                    <Route path="bookingdate" element={<BookingDateControl />}/>
                    <Route path="initialsetup" element={<InitialSetup />}/>
                    {/* <Route path="announce" element={<Announce />}/> */}
                </Route>
                <Route path="/auth" element={!user ? (<Auth />) : (<Navigate to="/dashboard" />)} />
            </Routes>
        </BrowserRouter>
    )
}

export default App