import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const FourZeroFour = () => {

    return (
        <Box
            sx={{
                margin: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography sx={{ padding: '1em', fontWeight: 'bold' }} variant="h1" color='primary'>
                404
            </Typography>
            <Button variant='contained' component={RouterLink} to='/'>
                home
            </Button>
        </Box>
    );
}

export default FourZeroFour;