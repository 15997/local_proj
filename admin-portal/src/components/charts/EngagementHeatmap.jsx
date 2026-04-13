import React from 'react';
import { Box } from '@mui/material';

const heatmapData = [
  // Two rows of 7 blocks each like in the screenshot
  [0.2, 0.4, 0.2, 0.8, 0.5, 0.2, 0.2],
  [0.4, 0.5, 0.6, 0.4, 0.2, 0.4, 0.4]
];

const EngagementHeatmap = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
      {heatmapData.map((row, rowIndex) => (
        <Box key={rowIndex} sx={{ display: 'flex', gap: 1.5, width: '100%', justifyContent: 'space-between' }}>
          {row.map((val, colIndex) => (
            <Box 
              key={colIndex} 
              sx={{ 
                flex: 1, 
                aspectRatio: '1.2/1', 
                borderRadius: 2, 
                bgcolor: '#6366f1',
                opacity: val,
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: Math.min(val + 0.2, 1),
                  cursor: 'pointer'
                }
              }} 
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default EngagementHeatmap;
