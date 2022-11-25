import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import component
import { Container, Paper, Typography, Avatar, Grid, Button } from '@mui/material';
import InputAuth from './InputAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';

// import actions
import { signin, signup } from '../../../../actions/dashboardMenu';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if(user){
      console.log('logout automatically');
      navigate('/dashboard');
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    isSignup ? dispatch(signup(formData, navigate)) : dispatch(signin(formData, navigate))
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const switchMode = () => { setIsSignup((prevIsSignup) => !prevIsSignup) }
  
  return (
    <Container component='main' maxWidth='xs'>
        <Paper elevation={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt:'2rem', p: '0.5rem'}}>
            <Avatar sx={{m: '1rem'}}><FontAwesomeIcon icon={faLockOpen} /></Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '0.75rem' }}>
              <Grid rowSpacing="2" container>
                {
                  isSignup && (
                    <>
                      <InputAuth name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                      <InputAuth name="lastName" label="Last Name" handleChange={handleChange}  half />
                    </>
                  )
                }
                <InputAuth name="email" label="Email Address" handleChange={handleChange} type="email" />
                <InputAuth name="password" label="Password" handleChange={handleChange} 
                  type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}
                />
                { isSignup && <InputAuth name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                {isSignup ? 'Sign Up' : 'Sign In'}
              </Button>
              {/* button for change from signIn to signUp and otherwise */}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    { isSignup ? "already have an account? Sign In" : "Don't have an account? Sign Up" }
                  </Button>
                </Grid>
              </Grid>

            </form>
        </Paper>
    </Container>
  )
}

export default Auth