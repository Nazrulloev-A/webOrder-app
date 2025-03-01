import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Layout from '../components/Layout';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import OrdersList from '../pages/OrdersList';
import AllOrders from '../pages/AllOrders';
import Order from '../pages/Order';
import ErrorBoundary from '../components/ErrorBoundary';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={
          <ErrorBoundary>
            <Layout>
              <Dashboard />
            </Layout>
          </ErrorBoundary>
        } />
        <Route path="/dashboard/orders" element={
          <ErrorBoundary>
            <Layout>
              <OrdersList />
            </Layout>
          </ErrorBoundary>
        } />
        <Route path="/dashboard/all-orders" element={
          <ErrorBoundary>
            <Layout>
              <AllOrders />
            </Layout>
          </ErrorBoundary>
        } />
        <Route path="/dashboard/order" element={
          <ErrorBoundary>
            <Layout>
              <Order />
            </Layout>
          </ErrorBoundary>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;