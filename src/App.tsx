import * as React from 'react';
import UnauthedPage from './components/UnauthedPage';
import TitleBar from './components/TitleBar';
import PackageList from './components/PackageList';
import FileUpload from './components/FileUpload';
import { Box, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import FourZeroFour from './components/FourZeroFour';
import HomePage from './components/HomePage';
import ResetPage from './components/ResetPage';

const App = () => {
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    // check if there is a valid auth token in local storage
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsSignedIn(true);
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setIsSignedIn(false);
    };

    return (
        <Box>
            <TitleBar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} handleSignOut={handleSignOut} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/packages" element={<PackageList />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path="/reset" element={<ResetPage />} />
                <Route path="*" element={
                    <FourZeroFour />
                } />
            </Routes>
        </Box>
    );
};

export default App;
