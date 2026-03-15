import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Box, Typography } from '@mui/material';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <Box sx={{ 
        bgcolor: 'background.paper', 
        p: 1.5, 
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 1,
        boxShadow: 3
      }}>
        <Typography variant="body2" sx={{ color: data.payload.fill, fontWeight: 600 }}>
          {data.name}: {data.value}%
        </Typography>
      </Box>
    );
  }
  return null;
};

const CategoryPieChart = ({ data }) => {
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoryPieChart;
