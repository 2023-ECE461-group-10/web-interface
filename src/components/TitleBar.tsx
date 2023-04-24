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

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = React.useState(false);

    // if isSignedIn is true, then open is false and the popover is closed

    React.useEffect(() => {
        setOpen(isSignedIn ?? false);
    }, [isSignedIn]);


    const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const id = open ? 'login-popover' : undefined;

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
                    {isSignedIn ||
                        <><Button onClick={handleLoginClick} color="inherit">Login</Button>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }} >
                                <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
                            </Popover>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <Offset />
        </Box>
    );
};

export default TitleBar;
