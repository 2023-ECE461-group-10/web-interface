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
                <Typography sx={{ padding: '1em', fontWeight: 'bold' }} variant="h1" color='primary'>
                    ACME
                </Typography>
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