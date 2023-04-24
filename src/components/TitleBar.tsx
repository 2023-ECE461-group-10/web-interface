import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import SignIn from './SignIn';
import { styled } from '@mui/material/styles';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const TitleBar = ({ isSignedIn, setIsSignedIn }: any) => {

    const [open, setOpen] = React.useState(false);

    const handleLoginClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ACME Package Registry
                    </Typography>
                    <Button onClick={handleLoginClick} disabled={isSignedIn} color="inherit">Login</Button>
                    <Popover
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }} >
                        <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} handleClose={handleClose} />
                    </Popover>
                </Toolbar>
            </AppBar>
            <Offset />
        </Box>
    );
};

export default TitleBar;
