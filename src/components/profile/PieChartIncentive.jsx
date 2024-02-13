import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: '?', value: 63 },
  { name: '?', value: 15 },
  { name: '?', value: 22 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const PieChartIncentive = () => (
  <Card>
    <CardContent>
      <Typography variant="h6">Health/Facility Summary</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default PieChartIncentive;
