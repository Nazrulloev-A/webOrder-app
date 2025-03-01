import React from 'react';
import { Typography, Container } from '@mui/material';

const AllOrders = () => {
  return (
    <Container maxWidth="md" sx={{
      padding: { xs: '8px', sm: '24px' }, // Smaller padding on mobile
      marginTop: { xs: '8px', sm: '32px' }, // Smaller margin on mobile
    }}>
      <Typography variant="h4" gutterBottom>
        View All Orders
      </Typography>
      <Typography variant="body1">
        This is the View All Orders page. Add your all orders content here.
      </Typography>
    </Container>
  );
};

export default AllOrders;