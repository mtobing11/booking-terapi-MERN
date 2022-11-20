import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// import components
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { CustomPaper } from './styles';

const stylePage = {
    position: 'relative',
    display: 'flex',
    backgroundColor: 'rgb(248 250 252)'
}

const Dashboard = () => {
  const [style1, setStyle1] = useState(stylePage);
  const activeMenu = useSelector((state) => state.dashboard.activeMenu);

  useEffect(() => {
    console.log("Menu:", activeMenu)
  }, [activeMenu])

  return (
    <div style={style1}>
      {activeMenu && (
        <Sidebar />
      )}
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard