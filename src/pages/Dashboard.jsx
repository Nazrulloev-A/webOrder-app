import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Typography, Button, Box } from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{
      padding: { xs: '8px', sm: '24px' }, // Smaller padding on mobile
      marginTop: { xs: '8px', sm: '32px' }, // Smaller margin on mobile
      textAlign: 'center',
    }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: { xs: '8px', sm: '16px' } }}>
        You have successfully logged in.
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;