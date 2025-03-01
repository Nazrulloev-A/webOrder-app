import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Checkbox, 
  Button, 
  Box 
} from '@mui/material';
import { supabase } from '../supabaseClient';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Fetch all orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
        alert('Error fetching orders. Please try again.');
      }
    };
    fetchOrders();
  }, []);

  // Handle checkbox selection
  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  // Handle "Check All" and "Uncheck All"
  const handleToggleAll = (checked) => {
    if (checked) {
      setSelectedOrders(orders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle deleting selected orders
  const handleDeleteSelected = async () => {
    if (selectedOrders.length === 0) {
      alert('Please select at least one order to delete.');
      return;
    }

    if (window.confirm('Are you sure you want to delete the selected orders?')) {
      try {
        const { error } = await supabase
          .from('orders')
          .delete()
          .in('id', selectedOrders);

        if (error) throw error;

        setOrders(orders.filter(order => !selectedOrders.includes(order.id)));
        setSelectedOrders([]);
        alert('Selected orders deleted successfully!');
      } catch (error) {
        console.error('Error deleting orders:', error.message);
        alert('Error deleting orders. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{
      padding: { xs: '8px', sm: '24px' },
      marginTop: { xs: '8px', sm: '32px' },
    }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
          List of All Orders
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button 
            variant="contained" 
            color="info" 
            onClick={() => handleToggleAll(true)}
            sx={{ backgroundColor: '#A9A9A9', '&:hover': { backgroundColor: '#808080' } }}
          >
            Check All
          </Button>
          <Button 
            variant="contained" 
            color="info" 
            onClick={() => handleToggleAll(false)}
            sx={{ backgroundColor: '#A9A9A9', '&:hover': { backgroundColor: '#808080' } }}
          >
            Uncheck All
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleDeleteSelected}
            sx={{ backgroundColor: '#FF4500', '&:hover': { backgroundColor: '#FF6347' } }}
          >
            Delete Selected
          </Button>
        </Box>
      </Box>

      <TableContainer sx={{ border: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#A9A9A9' }}>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell> {/* Checkbox column */}
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Street</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>City</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>State</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Zip</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Card</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Card Number</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Exp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fff' } }}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                  />
                </TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' })}</TableCell>
                <TableCell>{order.street}</TableCell>
                <TableCell>{order.city}</TableCell>
                <TableCell>{order.state || 'N/A'}</TableCell>
                <TableCell>{order.zip}</TableCell>
                <TableCell>{order.card_type}</TableCell>
                <TableCell>{order.card_number}</TableCell>
                <TableCell>{order.expire_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllOrders;