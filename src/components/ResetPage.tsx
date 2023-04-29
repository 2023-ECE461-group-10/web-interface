import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ConfirmationDialog from './ConfirmationDialog';
import { resetDatabase } from '../api/apiCalls';

const ResetPage = () => {

    const [open, setOpen] = React.useState(false);

    const handleSystemReset = async () => { // calls reset function in App.tsx
        // trigger confirmation dialog
        console.log('resetting database');
        try {
            await resetDatabase();
            console.log('database reset');
            // open success snackbar
        } catch (error) {
            console.log(error, 'error resetting database');
            // open error snackbar
        }
    };

    return (
        <Box
            sx={{
                margin: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography sx={{ padding: '1em', fontWeight: 'bold' }} variant="h1" color='error'>
                Reset System State
            </Typography>
            <Button
                sx={{ margin: '0.5em', width: '20em' }}
                variant='contained'
                color='error'
                onClick={() => setOpen(true)}>
                Reset to default System State
            </Button>
            <Button sx={{ margin: '0.5em', width: '20em' }} variant='contained' component={RouterLink} to='/'>
                Back to Home
            </Button>
            <ConfirmationDialog open={open} setOpen={setOpen} confirmAction={handleSystemReset} />
        </Box>
    );
}

export default ResetPage;