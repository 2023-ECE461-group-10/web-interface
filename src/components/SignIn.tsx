import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { authenticate } from '../api/apiCalls';

// takes isSignedIn, setIsSignedIn props
const SignIn = ({ setIsSignedIn, handleClose }: any): JSX.Element => {

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get('username') as string;
        const password = data.get('password') as string;

        try {
            // put request for authentication
            const response = await authenticate(username, password);
            console.log(response.data);
            // upon successful login put access token in local storage
            localStorage.setItem('token', response.data);
            // token expires in 10 hours
            localStorage.setItem('token-expiration', (Date.now() + 36000000).toString());
            setIsSignedIn(true);
            handleClose();
            navigate('/');
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        color="primary"
                        type="submit"
                        fullWidth
                        variant="contained"

                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default SignIn;