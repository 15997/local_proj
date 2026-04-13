import React from 'react';
import { Box } from '@mui/material';

const GlobalReachMap = () => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        borderRadius: 2,
        bgcolor: '#0a0d14',
        overflow: 'hidden'
      }}
    >
      {/* Map dots representation */}
      {/* Glowing Dot 1 */}
      <Box sx={{ 
        position: 'absolute', top: '25%', left: '30%', width: 6, height: 6, borderRadius: '50%', bgcolor: '#6366f1',
        boxShadow: '0 0 10px 3px rgba(99, 102, 241, 0.5)'
      }} />
      
      {/* Glowing Dot 2 */}
      <Box sx={{ 
        position: 'absolute', top: '75%', left: '55%', width: 8, height: 8, borderRadius: '50%', bgcolor: '#c084fc',
        boxShadow: '0 0 12px 4px rgba(192, 132, 252, 0.4)'
      }} />

      {/* Glowing Dot 3 */}
      <Box sx={{ 
        position: 'absolute', top: '65%', left: '72%', width: 4, height: 4, borderRadius: '50%', bgcolor: '#6366f1',
        boxShadow: '0 0 8px 2px rgba(99, 102, 241, 0.3)'
      }} />
    </Box>
  );
};

export default GlobalReachMap;
