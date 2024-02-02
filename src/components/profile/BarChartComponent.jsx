
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Hours: 58 },
  { name: 'Feb', Hours: 34 },
  // ...add more data for each month
];

const BarChartComponent = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Hours" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default BarChartComponent;
