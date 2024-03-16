import React from 'react';
import { Box } from '@mui/material';
import Navigation from './Navigation';
import Widget from './Widget';
import Table from './Table';

const InventoryDashboard = () => {
  return (
    <Box>
        <Navigation />
        <ProductsPage />
    </Box>
  )
}

const ProductsPage = () => {
  return (
    <>
      <Widget />
      <Table />
    </>
  )
}

export default InventoryDashboard;