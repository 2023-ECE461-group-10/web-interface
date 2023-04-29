import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isSignedIn }: any) => {
    const auth = isSignedIn; // determine if authorized, from context or however you're doing it

    console.log('isSignedIn', isSignedIn);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isSignedIn || !!localStorage.getItem('token') ? <Outlet /> : <Navigate to="/unauthed" />;
}

export default PrivateRoute;