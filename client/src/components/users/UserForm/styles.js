import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper, Typography } from '@mui/material';

const CustomPaper = styled(Paper)`
    padding: 2rem;
`;

const coolTheme = createTheme();

coolTheme.typography.h1 = {
    fontSize: '1.2rem',
    '@media (min-width: 600px)': {
        fontSize: '1.5rem'
    },
    [coolTheme.breakpoints.up('md')]:{
        fontSize: '2rem',
    },
}

function CustomResponsiveFontSize(){
    return (
        <ThemeProvider theme={coolTheme}>
            <Typography variant="h1">Responsive h1</Typography>
        </ThemeProvider>
    )
}

export { CustomPaper, CustomResponsiveFontSize }


