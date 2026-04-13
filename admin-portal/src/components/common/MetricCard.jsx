import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const MetricCard = ({ title, value, change, icon, color = '#6b7aff', isNegative = false }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        position: 'relative', 
        overflow: 'hidden',
        bgcolor: '#141b2d', // Dark card
        border: '1px solid rgba(255,255,255,0.03)',
        borderRadius: 3
      }}
    >
      <CardContent sx={{ p: 3, pt: 2.5, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          {/* Small Icon Badge */}
          <Box 
            sx={{ 
              width: 40,
              height: 40,
              borderRadius: 2, 
              bgcolor: `rgba(255,255,255,0.05)`,
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              '& svg': { fontSize: 20 }
            }}
          >
            {icon}
          </Box>
          
          {/* Trend */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, zIndex: 1 }}>
            {isNegative ? (
              <TrendingDownIcon sx={{ fontSize: 16, color: '#ef4444' }} />
            ) : (
              <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981' }} />
            )}
            <Typography 
              variant="caption" 
              sx={{ 
                color: isNegative ? '#ef4444' : '#10b981',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              {change}
            </Typography>
          </Box>
        </Box>
        
        {/* Texts */}
        <Box sx={{ mt: 'auto', zIndex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Typography variant="overline" sx={{ color: '#6b7280', fontWeight: 600, letterSpacing: '1px', lineHeight: 1, mb: 1, fontSize: '0.6rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#f9fafb', m: 0, lineHeight: 1 }}>
            {value}
          </Typography>
        </Box>

        {/* Watermark Icon */}
        <Box 
          sx={{ 
            position: 'absolute', 
            right: -20, 
            bottom: -20, 
            opacity: 0.03, 
            transform: 'scale(4.5)',
            color: 'white',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
