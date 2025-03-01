import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { supabase } from '../supabaseClient';
import { Box, Typography, Button } from '@mui/material';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  // Column definitions with null safety
  const [columnDefs] = useState([
    {
      field: 'id',
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 60
    },
    { field: 'customer_name', headerName: 'Name', filter: true, flex: 1 },
    { field: 'product', headerName: 'Product', flex: 1 },
    { field: 'quantity', headerName: '#', width: 80 },
    { 
      field: 'created_at', 
      headerName: 'Date',
      valueFormatter: (params) => params.value 
        ? new Date(params.value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
        : ''
    },
    { field: 'street', headerName: 'Street', flex: 1 },
    { field: 'city', headerName: 'City', width: 120 },
    { field: 'state', headerName: 'State', width: 80 },
    { field: 'zip', headerName: 'Zip', width: 100 },
    { field: 'card_type', headerName: 'Card', width: 120 },
    { 
      field: 'card_number', 
      headerName: 'Card Number',
      valueFormatter: (params) => params.value 
        ? params.value.replace(/.(?=.{4})/g, '*')
        : ''
    },
    { field: 'expire_date', headerName: 'Exp', width: 100 }
  ]);

  // Fetch orders with error handling
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        
        setOrders(data || []);
        
        if (error) throw error;
      } catch (error) {
        console.error('Fetch error:', error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  // Delete handler with null checks
  const handleDeleteSelected = async () => {
    if (!gridApi) return;
    
    const selectedRows = gridApi.getSelectedRows() || [];
    
    if (selectedRows.length === 0) {
      alert('Please select orders to delete');
      return;
    }

    if (window.confirm(`Delete ${selectedRows.length} orders?`)) {
      try {
        const { error } = await supabase
          .from('orders')
          .delete()
          .in('id', selectedRows.map(row => row.id));

        if (!error) {
          gridApi.applyTransaction({ remove: selectedRows });
          gridApi.deselectAll();
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: '100vh',
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Typography variant="h4" sx={{ color: 'primary.main' }}>
        List of All Orders
      </Typography>

      <Button
        variant="contained"
        color="error"
        onClick={handleDeleteSelected}
        sx={{ 
          alignSelf: 'flex-start',
          backgroundColor: '#FF4500',
          '&:hover': { backgroundColor: '#FF6347' }
        }}
      >
        Delete Selected ({gridApi?.getSelectedRows()?.length || 0})
      </Button>

      <Box sx={{ 
        flex: 1,
        width: '100%',
        '& .ag-theme-alpine': {
          height: '100%',
          width: '100%'
        }
      }}>
        <AgGridReact
          rowData={orders}
          columnDefs={columnDefs}
          onGridReady={(params) => setGridApi(params.api)}
          rowSelection="multiple"
          suppressRowClickSelection
          pagination={true}
          paginationPageSize={20}
          domLayout="autoHeight"
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            // Add default null handling
            valueFormatter: params => params.value ?? ''
          }}
        />
      </Box>
    </Box>
  );
};

export default AllOrders;