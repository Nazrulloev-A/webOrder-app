import React from 'react';
import { Typography, Container } from '@mui/material';

const Order = () => {
  return (
    <Container maxWidth="md" sx={{
      padding: { xs: '8px', sm: '24px' }, // Smaller padding on mobile
      marginTop: { xs: '8px', sm: '32px' }, // Smaller margin on mobile
    }}>
      <Typography variant="h4" gutterBottom>
        Order
      </Typography>
      <Typography variant="body1">
        This is the Order page. Add your order details content here.
      </Typography>
    </Container>
  );
};

export default Order;