import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const MetricCard = ({ title, value, change, icon, color = 'primary' }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Box 
            sx={{ 
              p: 1, 
              borderRadius: 2, 
              bgcolor: `${color}.main`,
              color: 'white',
              display: 'flex',
              opacity: 0.9
            }}
          >
            {icon}
          </Box>
        </Box>
        
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
          {value}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: change.startsWith('+') ? 'secondary.main' : 
                     change.includes('decreased') ? 'error.main' : 
                     'text.secondary',
              fontWeight: 600,
              bgcolor: change.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
              px: 1,
              py: 0.5,
              borderRadius: 1
            }}
          >
            {change}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
