import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'TECH', value: 45, color: '#6366f1' },
  { name: 'CREATIVE', value: 30, color: '#c084fc' },
  { name: 'HOME', value: 25, color: '#10b981' },
];

const ServiceDistributionDonut = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#141b2d', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#f9fafb' }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <Typography variant="h5" sx={{ color: '#f9fafb', fontWeight: 700, lineHeight: 1 }}>12k</Typography>
          <Typography variant="caption" sx={{ color: '#6b7280', fontSize: '0.6rem', letterSpacing: '1px' }}>TOTAL</Typography>
        </Box>
      </Box>

      {/* Custom Legend */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, width: '100%', mt: 2 }}>
        {data.map((item, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: item.color }} />
            <Typography variant="caption" sx={{ color: '#f9fafb', fontSize: '0.65rem', letterSpacing: '0.5px' }}>
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ServiceDistributionDonut;
