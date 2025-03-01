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
  Paper 
} from '@mui/material';
import HeadIcon from '../assets/head.png';

const Login = () => {
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and signup

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    if (isSignUp) {
      // Handle sign up
      const success = await signup(email, password);
      if (success) {
        setError('');
        navigate('/dashboard');
      } else {
        setError('Sign Up failed. Email may already exist or an error occurred.');
      }
    } else {
      // Handle login
      const success = await login(email, password);
      if (success) {
        setError('');
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
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
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: 'center', borderRadius: 2 }}>
          <Box
            sx={{
              width: '100%',
              textAlign: 'left'
            }}
          >
            <Box component="img" src={HeadIcon} sx={{ width: 90, marginBottom: 2, display: "block", marginLeft: "auto", marginRight: "auto" }} />
            <Typography variant="h1" sx={{ 
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#101828',
              mb: 1,
              textAlign: 'center'
            }}>
              {isSignUp ? 'Create Account' : 'Welcome'}
            </Typography>
            
            <Typography variant="body1" sx={{ 
              fontSize: '0.875rem',
              color: '#667085',
              mb: 3
            }}>
              {isSignUp ? 'Enter your details to create a new account.' : 'Enter your credentials to sign in.'}
            </Typography>

            {error && (
              <Typography color="error" sx={{ 
                fontSize: '0.75rem',
                mb: 1.5 
              }}>
                {error}
              </Typography>
            )}

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
                color: '#292D2A',
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
              onClick={handleAuth}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#667085' }}>
                {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
                <Button
                  onClick={() => setIsSignUp(!isSignUp)}
                  sx={{ 
                    fontSize: '0.75rem', 
                    color: '#448DE6', 
                    textTransform: 'none', 
                    p: 0, 
                    ml: 0.5 
                  }}
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;