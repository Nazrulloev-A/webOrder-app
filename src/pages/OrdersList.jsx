import React from 'react';
import { Typography, Container } from '@mui/material';

const OrdersList = () => {
  return (
    <Container maxWidth="md" sx={{
      padding: { xs: '8px', sm: '24px' }, // Smaller padding on mobile
      marginTop: { xs: '8px', sm: '32px' }, // Smaller margin on mobile
    }}>
      <Typography variant="h4" gutterBottom>
        List of Orders
      </Typography>
      <Typography variant="body1">
        This is the List of Orders page. Add your order list content here.
      </Typography>
    </Container>
  );
};

export default OrdersList;