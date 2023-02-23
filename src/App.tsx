import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const App = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ACME Package Registry
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
          My girlfriend is awesome
        </Typography>
      </Box>
    </Container>
  );
}

export default App;