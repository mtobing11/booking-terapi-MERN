import { createTheme } from '@mui/material/styles';

const coolTheme = createTheme();

coolTheme.typography.h1 = {
    color: '#FFF',
    fontSize: '1.5rem',
    '@media (min-width: 600px)': {
        fontSize: '2rem'
    },
    [coolTheme.breakpoints.up('md')]:{
        fontSize: '3rem',
    },
}

coolTheme.typography.h2 = {
    color: '#FFF',
    fontWeight: '100',
    fontSize: '0.9rem',
    '@media (min-width: 600px)': {
        fontSize: '1.2rem'
    },
    [coolTheme.breakpoints.up('md')]:{
        fontSize: '1.5rem',
    },
}

coolTheme.typography.body1 = {
    color: '#FFF',
    fontWeight: '100',
    fontSize: '0.7rem',
    '@media (min-width: 600px)': {
        fontSize: '0.8rem'
    }
}
export default coolTheme