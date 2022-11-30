import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

// import components`
import { Typography, Paper, Button } from '@mui/material';
import { Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faX } from '@fortawesome/free-solid-svg-icons';

import { links } from '../../../../data/data';

// import actions
import { handleActiveMenu } from '../../../../actions/dashboardMenu';

// styles
const styleSidebar = {
  height: '100vh', overFlow: 'auto', paddingBottom: '2.5rem'
}
const styleSidebar3 = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '0.75rem'
}
const styleSidebar4 = {
  fontSize: '1.25rem', lineHeight: '1.75rem', marginLeft: '0.75rem', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem'
}
const activeLinkStyle = {
  display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1rem', paddingTop: '0.75rem',paddingBottom: '0.625rem',
  borderRadius: '0.5rem', color: '#FFF', fontSize: '1rem', lineHeight: '1.5rem' , backgroundColor: '#03C9D7'
}
const normalLinkStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'flexStart', gap: '0.5rem', paddingLeft: '1rem', paddingTop: '0.75rem', paddingBottom: '0.625rem',
  borderRadius: '0.5rem', color: 'rgb(55 65 81)', fontSize: '1rem', lineHeight: '1.5rem', paddingRight: '1rem'
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const [style02, setStyle02] = useState(styleSidebar);
  const [style03, setStyle03] = useState(styleSidebar3);
  const [style04, setStyle04] = useState(styleSidebar4);
  const [activeLink, setActiveLink] = useState(activeLinkStyle);
  const [normalLink, setNormalLink] = useState(normalLinkStyle);
  const activeMenu = useSelector((state) => state.dashboard.activeMenu);
  const screenSize = useSelector((state) => state.dashboard.screenSize);

  const handleCloseSideBar = () => {
    if(activeMenu && screenSize <= 900){
      dispatch(handleActiveMenu(false))
    }
  }

  return (
    <Paper style={style02}>
      {activeMenu && (
        <div>
          <div style={style03}>
            <Link to="/dashboard" onClick={handleCloseSideBar} style={style04}>
              <FontAwesomeIcon icon={faHouse} /><span>Home</span>
            </Link>
            <Tooltip title="Menu" placement="bottom">
              <Button sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, py: '0.4rem', px: '0.4rem' }} onClick={handleCloseSideBar}>
                <FontAwesomeIcon icon={faX} />
              </Button>
            </Tooltip>
          </div>
          <Paper sx={{mt: '1.25rem', mx: '0.75rem'}} elevation={0}>
            {links.map((item) => (
              <Paper key={item.title} elevation={0}>
                <Typography>{item.title}</Typography>
                {item.links.map((link) => (
                  <NavLink to={`/dashboard/${link.link}`} key={link.name} onClick={handleCloseSideBar}
                    style = { ({ isActive }) => isActive ? activeLink : normalLink }
                  >
                    <span style={{ width: '30px' }}>{link.icon}</span>
                    <Typography sx={{ textTransform: 'capitalize' }} >{link.name}</Typography>
                  </NavLink>
                ))}
              </Paper>
            ))}
          </Paper>
        </div>
      )}
    </Paper>
  )
}

export default Sidebar