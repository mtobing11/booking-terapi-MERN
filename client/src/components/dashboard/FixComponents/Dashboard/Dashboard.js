import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import dayjs from 'dayjs';

// import components
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

// import actions
import { getAllDates } from '../../../../actions/dashboardMenu';

const stylePage = {
    position: 'relative',
    display: 'flex',
    backgroundColor: 'rgb(248 250 252)'
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [style1] = useState(stylePage);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const activeMenu = useSelector((state) => state.dashboard.activeMenu);

  useEffect(() => {
    if(!user){
      console.log('logout automatically');
      navigate('/auth');
    }
    if(user){
      console.log("initial for booking date control")
      let dateNow = new Date(11-25-2022);
      dateNow.setDate(dateNow.getDate());

      dispatch(getAllDates(dayjs(new Date(dateNow))))
    }
  }, []);

  useEffect(() => {
      const token = user?.token;

      if(token) {
          const decodedToken = decode(token);
          // console.log(decodedToken);
          if(decodedToken.exp * 1000 < new Date().getTime()) logout()
      }

      setUser(JSON.parse(localStorage.getItem('profile')))

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
    setUser(null)
  }

  return (
    <div style={style1}>
      {activeMenu ? (
        <div style={{position: 'fixed', width: '250px'}}>
          <Sidebar />
        </div>
      ) : (
        <div style={{position: 'fixed', width: '0px'}}>
          <Sidebar />
        </div>
      )}
      <div style={{ marginLeft: activeMenu ? '250px' : '0px', marginRight: '1rem', width: '100%' }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard