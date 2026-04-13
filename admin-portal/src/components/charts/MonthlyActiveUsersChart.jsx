import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { Box } from '@mui/material';

const data = [
  { name: 'WEEK 1', uv: 100 },
  { name: '', uv: 120 },
  { name: '', uv: 80 },
  { name: 'WEEK 2', uv: 150 },
  { name: '', uv: 110 },
  { name: '', uv: 230 },
  { name: 'WEEK 3', uv: 190 },
  { name: '', uv: 240 },
  { name: '', uv: 200 },
  { name: 'WEEK 4', uv: 280 },
  { name: '', uv: 250 }
];

const MonthlyActiveUsersChart = () => {
  return (
    <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <filter id="glowPurple" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280', fontSize: 10 }}
            dy={10}
          />
          <Line 
            type="linear" 
            dataKey="uv" 
            stroke="#c084fc" 
            strokeWidth={3}
            style={{ filter: 'url(#glowPurple)' }}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthlyActiveUsersChart;
