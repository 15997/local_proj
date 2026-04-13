import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const drawerWidth = 220;

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0b0f19' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden'
        }}
      >
        <TopBar />
        <Box sx={{ px: 3, pb: 3, flexGrow: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {children || <Outlet />}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
