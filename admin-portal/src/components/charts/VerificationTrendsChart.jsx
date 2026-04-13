import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const data = [
  { label: 'BACKGROUND', value: 82, color: '#6366f1' },
  { label: 'IDENTITY', value: 64, color: '#c084fc' },
  { label: 'SKILLSET', value: 41, color: '#10b981' }
];

const VerificationTrendsChart = () => {
  return (
    <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {data.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              width: 100, 
              color: '#6b7280', 
              fontSize: '0.65rem', 
              fontWeight: 600, 
              letterSpacing: '1px' 
            }}
          >
            {item.label}
          </Typography>
          <Box sx={{ flexGrow: 1, position: 'relative', mx: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={100} 
              sx={{ 
                height: 8, 
                borderRadius: 4, 
                bgcolor: 'rgba(255,255,255,0.05)',
                position: 'absolute',
                width: '100%',
                top: 0
              }} 
            />
            <LinearProgress 
              variant="determinate" 
              value={item.value} 
              sx={{ 
                height: 8, 
                borderRadius: 4, 
                bgcolor: 'transparent',
                '& .MuiLinearProgress-bar': {
                  bgcolor: item.color,
                  borderRadius: 4,
                  boxShadow: `0 0 10px ${item.color}`
                }
              }} 
            />
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              width: 30, 
              textAlign: 'right', 
              color: '#f9fafb', 
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            {item.value}%
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default VerificationTrendsChart;
