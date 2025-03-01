import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Layout from '../components/Layout'; // Adjust the path as needed
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import OrdersList from '../pages/OrdersList';
import AllOrders from '../pages/AllOrders';
import Order from '../pages/Order';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Protected Routes wrapped in Layout */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/dashboard/orders" element={
          <Layout>
            <OrdersList />
          </Layout>
        } />
        <Route path="/dashboard/all-orders" element={
          <Layout>
            <AllOrders />
          </Layout>
        } />
        <Route path="/dashboard/order" element={
          <Layout>
            <Order />
          </Layout>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;