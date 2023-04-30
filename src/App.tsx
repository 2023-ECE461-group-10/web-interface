import * as React from 'react';
import UnauthedPage from './components/UnauthedPage';
import TitleBar from './components/TitleBar';
import PackageList from './components/PackageList';
import FileUpload from './components/FileUpload';
import { Box, Button } from '@mui/material';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import FourZeroFour from './components/FourZeroFour';
import HomePage from './components/HomePage';
import ResetPage from './components/ResetPage';
import PrivateRoute from './components/PrivateRoute';
import { useSnackbar } from 'material-ui-snackbar-provider'

const App = () => {
    const [isSignedIn, setIsSignedIn] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const snackbar = useSnackbar();


    // check if there is a valid auth token in local storage
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        // check if token is expired
        const expiration = localStorage.getItem('token-expiration');
        if (expiration && Date.now() > parseInt(expiration)) {
            handleSignOut();
        }
        else if (token) {
            setIsSignedIn(true);
        }
        // console.log('location changed');
    }, [location.pathname]);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-expiration');
        setIsSignedIn(false);
        navigate('/unauthed');
        // open a snackbar to tell user they have been signed out
        snackbar.showMessage('You have been signed out, your session has expired');
    };

    return (
        <Box>
            <TitleBar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} handleSignOut={handleSignOut} />
            <Routes>
                <Route path="/unauthed" element={<UnauthedPage />} />
                <Route path="/" element={<PrivateRoute isSignedIn={isSignedIn} />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/packages" element={<PackageList />} />
                    <Route path="/upload" element={<FileUpload />} />
                    <Route path="/reset" element={<ResetPage />} />
                </Route>
                <Route path="*" element={
                    <FourZeroFour />
                } />
            </Routes>
        </Box>
    );
};

export default App;
