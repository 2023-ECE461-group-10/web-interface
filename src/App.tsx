import * as React from 'react';
import UnauthedPage from './components/UnauthedPage';
import TitleBar from './components/TitleBar';
import Button from '@mui/material/Button/Button';
import PackageList from './components/PackageList';

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
        <>
            <TitleBar />
            
            <PackageList />
            {/* {isSignedIn ?
                <Button variant='contained' onClick={handleSignOut}> sign out </Button> :
                <UnauthedPage />
            } */}
        </>
    );
};

export default App;
