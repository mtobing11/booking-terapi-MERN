import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

// import components
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

const stylePage = {
    position: 'relative',
    display: 'flex',
    backgroundColor: 'rgb(248 250 252)'
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [style1] = useState(stylePage);
  const activeMenu = useSelector((state) => state.dashboard.activeMenu);
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if(!user){
      navigate('/auth')
    }
  }, [user])

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
      <div style={{ marginLeft: activeMenu ? '250px' : '0px' }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard