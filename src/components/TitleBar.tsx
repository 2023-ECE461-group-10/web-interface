import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import SignIn from './SignIn';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useMatch } from 'react-router-dom';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const TitleBar = ({ isSignedIn, setIsSignedIn, handleSignOut }: any) => {

    const [open, setOpen] = React.useState<boolean>(false);

    const onResetPage = useMatch('/reset');

    const handleLoginClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="fixed" color={onResetPage ? 'secondary' : 'primary'}>
                <Toolbar>
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <Typography component={RouterLink} to='/' color='inherit' sx={{ paddingRight: '1em', textDecoration: "none" }} variant="h6" >
                            ACME Package Registry
                        </Typography>
                        {isSignedIn &&
                            <>
                                <Button color="inherit" component={RouterLink} to="/packages">
                                    Packages
                                </Button>
                                <Button color="inherit" component={RouterLink} to="/upload">
                                    Upload
                                </Button>
                            </>
                        }
                    </Box>
                    {isSignedIn ?
                        <Button onClick={handleSignOut} color="inherit"> sign out </Button> :
                        <Button onClick={handleLoginClick} color="inherit">Sign in</Button>
                    }
                    <Popover
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} >
                        <SignIn setIsSignedIn={setIsSignedIn} handleClose={handleClose} />
                    </Popover>
                </Toolbar>
            </AppBar>
            <Offset />
        </Box>
    );
};

export default TitleBar;
