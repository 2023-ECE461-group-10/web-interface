import * as React from 'react';
import UnauthedPage from './components/UnauthedPage';
import TitleBar from './components/TitleBar';
import Button from '@mui/material/Button/Button';
import PackageList from './components/PackageList';
import FileUpload from './components/FileUpload';
import FileDownload from './components/FileDownload';
import { Box } from '@mui/material';

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
            {isSignedIn ?
                <Box >
                    <PackageList /> :
                </Box> :
                <UnauthedPage />
            }
        </Box>
    );
};

export default App;
