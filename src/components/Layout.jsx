import React, { useContext, useState } from 'react'; // Added useContext to the import
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton,
  CssBaseline
} from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext'; // Ensure this path is correct

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2', // Consistent blue for navbar
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1d1d1d' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
        secondary: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#1976d2', // Fixed color regardless of mode
            color: '#ffffff', // White text for contrast
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // Only apply to non-navbar buttons
            color: ({ ownerState }) => 
              ownerState.color !== 'inherit' ? (darkMode ? '#ffffff' : '#000000') : undefined,
          },
        },
      },
    },
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar */}
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('/dashboard')}
                sx={{ color: '#ffffff' }} // Ensure white text
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('/dashboard/orders')}
                sx={{ color: '#ffffff' }}
              >
                List of Orders
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('/dashboard/all-orders')}
                sx={{ color: '#ffffff' }}
              >
                View All Orders
              </Button>
              <Button 
                color="inherit" 
                onClick={() => handleNavigation('/dashboard/order')}
                sx={{ color: '#ffffff' }}
              >
                Order
              </Button>
            </Box>
            <Typography variant="body1" sx={{ mr: 2, color: '#ffffff' }}>
              Welcome, {user.email}!
            </Typography>
            {/* Dark Mode Toggle with professional icons */}
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="md" sx={{ flexGrow: 1 }}>
          {children}
        </Container>

        {/* Footer */}
        <Box 
          component="footer" 
          sx={{ 
            py: 2, 
            textAlign: 'center', 
            backgroundColor: darkMode ? 'grey.900' : 'grey.200',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;