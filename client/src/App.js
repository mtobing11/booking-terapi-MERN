import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../src/components/users/Home/Home';
// import Dashboard from '../src/components_dashboard/Dashboard/Dashboard';
// import Ecommerce from '../src/components_dashboard/Ecommerce/Ecommerce';
// import Newdate from '../src/components_dashboard/Newdate/Newdate';
// import Bookdate from '../src/components_dashboard/Bookdate/Bookdate';
// import Announce from '../src/components_dashboard/Announce/Announce'; 

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/dashboard" element={<Dashboard />}>
                    <Route index element={<Ecommerce />}/>
                    <Route path="ecommerce" element={<Ecommerce />}/>
                    <Route path="newdate" element={<Newdate />}/>
                    <Route path="bookdate" element={<Bookdate />}/>
                    <Route path="announce" element={<Announce />}/>
                </Route> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App