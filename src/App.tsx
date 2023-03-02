import * as React from 'react';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import TitleBar from './components/TitleBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App = () => {
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    return (
        <>
            <ThemeProvider theme={theme}>
                <TitleBar />
                {isSignedIn ?
                    <div>Logged in</div> :
                    <LandingPage />
                }
            </ThemeProvider>
        </>
    );
};

export default App;
