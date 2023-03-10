import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const UnauthedPage = () => {

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
                        Please Sign in To Continue
                    </Typography>
                </Box>
                <img src="/roadrunner.gif" alt="Roadrunner" width={"300em"} />
            </Box>
        </Container>
    );
}

export default UnauthedPage;