import * as React from 'react';
import SignIn from './components/SignIn';
import TitleBar from './components/TitleBar';

const App = () => {
    return (
        <>
            <TitleBar />
            {/* app content goes here */}
            <SignIn />
        </>
    );
};

export default App;
