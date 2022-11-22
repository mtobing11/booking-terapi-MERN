import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import components
import { Tooltip, Avatar, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../../../data/rhs_02.jpeg';

// import actions
import { handleActiveMenu, handleResizeScreen } from '../../../../actions/dashboardMenu';

// style
const styleNavbar = {
  position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0.5rem', marginLeft: '1.5rem', marginRight: '1.5rem',
}
const styleProfileWrapper = {
  display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem', borderRadius: '0.5rem',
}

// additional component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement="bottom">
    <button type="button" onClick={() => customFunc()} style={{ color, position: 'relative', fontSize: '1.25rem', padding: '0.75rem', borderRadius: '50%', border: '0', backgroundColor: 'rgb(248 250 252)' }}>
      <span style={{ background: dotColor, position: 'absolute', display: 'inline-flex', borderRadius: '50%', height: '0.5rem', width: '0.5rem', right: '0.5rem', top: '0.5rem' }} />
      {icon}
    </button> 
  </Tooltip>
)

const Navbar = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'))
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [styleNavbar1, setStyleNavbar1] = useState(styleNavbar);
  const [styleProfileWrapper1, setStyleProfileWrapper1] = useState(styleProfileWrapper);
  const activeMenu = useSelector((state) => state.dashboard.activeMenu);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth)
      dispatch(handleResizeScreen(screenSize));
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const handleMenu = () => {
    dispatch(handleActiveMenu(!activeMenu))
  }

  return (
    <div style={styleNavbar1}>
      <NavButton title='Menu' customFunc={handleMenu} color="#03C9D7" icon={<FontAwesomeIcon icon={faBars} />} />
      <div style={{ display: 'flex' }}>
        <Tooltip title='Profile' placement='bottom'>
          <div style={styleProfileWrapper1}>
            <Avatar src={avatar} />
            <div style={{ display: 'flex' }}>
              <Typography sx={{mr: '0.25rem'}} variant="body2" align="center">Hi</Typography>
              <Typography variant="body2" align="center">{user.userData.name}</Typography>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default Navbar