import { styled } from '@mui/material/styles';
import { Typography, Paper } from '@mui/material';

const TitleTypography = styled(Typography)`
    font-size: 2rem
`;
const ContentTypography = styled(Typography)`
    font-size: 1.2rem;
`;
const NoteTypography = styled(Typography)`
    font-size: 0.9rem;
    color: #CECECE;
`;

const CustomPaper = styled(Paper)`
    position: relative;
`

export { CustomPaper };