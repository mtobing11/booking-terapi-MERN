import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import components
import Home from '../src/components/users/Home/Home';
import Dashboard from './components/dashboard/FixComponents/Dashboard/Dashboard';
import Overview from './components/dashboard/Pages/Overview/Overview';
import BookingDateControl from './components/dashboard/Pages/BookingDateControl/BookingDateControl';
// import Newdate from '../src/components_dashboard/Newdate/Newdate';
// import Bookdate from '../src/components_dashboard/Bookdate/Bookdate';
// import Announce from '../src/components_dashboard/Announce/Announce'; 

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Overview />}/>
                    <Route path="overview" element={<Overview />}/>
                    <Route path="bookingdate" element={<BookingDateControl />}/>
                    {/* <Route path="bookdate" element={<Bookdate />}/>
                    <Route path="announce" element={<Announce />}/> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App