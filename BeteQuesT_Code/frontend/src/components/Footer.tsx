// components/Footer.tsx
import React from 'react';
import { Typography, Container, Box, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} BeteQuesT. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          <Link color="inherit" href="#">Privacy Policy</Link>
          {' | '}
          <Link color="inherit" href="#">Terms of Service</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;