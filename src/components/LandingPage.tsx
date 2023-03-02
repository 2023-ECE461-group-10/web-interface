import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function SignIn() {


    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    margin: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <img src="/acme-logo.png" alt="ACME Logo" width={"300em"} />
                <Box sx={{ marginBottom: 12 }}>
                    <Typography component="h1" variant="h5">
                        Please Login To Continue
                    </Typography>
                </Box>
                <img src="/roadrunner.gif" alt="Roadrunner" width={"300em"} />
            </Box>
        </Container>
    );
}