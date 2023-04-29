import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {

    return (
        <Box
            sx={{
                margin: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography sx={{ padding: '1em', fontWeight: 'bold' }} variant="h1" color='primary'>
                ACME
            </Typography>
            <Button sx={{ margin: '0.5em', width: '15em' }} variant='contained' component={RouterLink} to='/packages'>
                Packages
            </Button>
            <Button sx={{ margin: '0.5em', width: '15em' }} variant='contained' component={RouterLink} to='/upload'>
                Upload
            </Button>
            <Button sx={{ margin: '0.5em', width: '15em' }} variant='contained' color='error' component={RouterLink} to='/reset'>
                Reset System State
            </Button>
        </Box>
    );
}

export default HomePage;