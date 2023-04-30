import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ConfirmationDialog from './ConfirmationDialog';
import { resetDatabase } from '../api/apiCalls';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'material-ui-snackbar-provider'

const ResetPage = () => {

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const snackbar = useSnackbar();
    const navigate = useNavigate();

    const handleSystemReset = async () => { // calls reset function in App.tsx
        // trigger confirmation dialog
        console.log('resetting database');
        try {
            setLoading(true);
            await resetDatabase();
            console.log('database reset');
            // open success snackbar
            snackbar.showMessage('Database reset successfully');
            navigate('/');
        } catch (error) {
            console.log(error, 'error resetting database');
            // open error snackbar
            snackbar.showMessage('Error resetting database');
        }
        setLoading(false);
    };

    return (
        <Box
            sx={{
                margin: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Backdrop sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
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