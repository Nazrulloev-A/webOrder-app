import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Link, 
  Divider 
} from '@mui/material';
import { Business } from '@mui/icons-material';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (login(email, password)) {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#ffffff',
        p: 2
      }}
    >
      
      <Container 
        maxWidth="xs"
        disableGutters
        sx={{
          width: '100%',
          maxWidth: '400px',
          p: 2
        }}
      >
        <Box
          sx={{
            width: '100%',
            textAlign: 'left'
          }}
        >
           <Box component="img" src="/logo.png" alt="App Logo" sx={{ width: 90, marginBottom: 2 }} />
          {/* Header Section */}
          <Typography variant="h1" sx={{ 
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#101828',
            mb: 1
          }}>
            Welcome
          </Typography>
          
          <Typography variant="body1" sx={{ 
            fontSize: '0.875rem',
            color: '#667085',
            mb: 3
          }}>
            Spiritual goals during Ramadan
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography color="error" sx={{ 
              fontSize: '0.75rem',
              mb: 1.5 
            }}>
              {error}
            </Typography>
          )}

          {/* Email Input */}
          <Typography variant="subtitle2" sx={{ 
            fontSize: '0.75rem',
            color: '#344054',
            mb: 0.5
          }}>
            Username/Email Address*
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="admin@example.com"
            sx={{ 
              mb: 2,
              '& .MuiInputBase-root': {
                borderRadius: 1,
                height: 36,
                fontSize: '0.875rem'
              }
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 0.5 
          }}>
            <Typography variant="subtitle2" sx={{ 
              fontSize: '0.75rem',
              color: '#344054'
            }}>
              Password*
            </Typography>
            <Link href="#" sx={{ 
              fontSize: '0.75rem',
              color: '#6941c6',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}>
              Forgot password?
            </Link>
          </Box>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            size="small"
            placeholder="••••••••"
            sx={{ 
              mb: 3,
              '& .MuiInputBase-root': {
                borderRadius: 1,
                height: 36,
                fontSize: '0.875rem'
              }
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <Divider sx={{ color: 'black', mb: 3, fontSize: '0.75rem' }}>OR</Divider>
           {/* Microsoft Button */}
           <Button
            fullWidth
            variant="outlined"
            sx={{
              py: 1,
              fontSize: '0.875rem',
              borderRadius: 1,
              borderColor: '#d0d5dd',
              color: '#344054',
              mb: 3,
              textTransform: 'uppercase',
              '&:hover': {
                bgcolor: '#f8f9fa',
                borderColor: '#d0d5dd'
              }
            }}
            startIcon={<Business sx={{ 
              width: 18, 
              height: 18 
            }} />}
          >
            Continue with Microsoft Entra ID
          </Button>

          {/* Continue Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1,
              fontSize: '0.875rem',
              borderRadius: 1,
              bgcolor: '#448DE6',
              textTransform: 'uppercase',
              '&:hover': {
                bgcolor: '#296AB9'
              }
            }}
            onClick={handleLogin}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;