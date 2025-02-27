import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.email}!
        </Typography>
        
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          You have successfully logged in.
        </Typography>

        <Box>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
