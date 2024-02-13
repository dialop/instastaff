import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const BarChartGraph = () => {
  const [calendarData, setCalendarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth0();
  const [aggregatedData, setAggregatedData] = useState([]);
  
  

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
      
          setIsLoading(true);
          const userId = window.sessionStorage.getItem('userId');
          const response = await fetch(`/calendar/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch calendar data");
          }
          const data = await response.json();
          setCalendarData(data);
          setIsLoading(false);
    
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        setIsLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  
  
  useEffect(() => {
    if (calendarData) {
     
      const aggregatedData = calendarData.reduce((acc, shift) => {
        const shiftDate = new Date(shift.shift_date);
        const month = shiftDate.getMonth(); 
        const duration = shift.duration; 
        const existingMonthDataIndex = acc.findIndex(item => item.month === month);
        if (existingMonthDataIndex !== -1) {
          
          acc[existingMonthDataIndex].Hours += duration;
        } else {
          
          acc.push({ month, Hours: duration });
        }
        return acc;
      }, []);
      setAggregatedData(aggregatedData);
    }
  }, [calendarData]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  return (
    <Card>
    <CardContent>
      <Typography variant="h6">Total Hours Summary</Typography>
      {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {!isLoading && !error && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aggregatedData.length > 0 ? aggregatedData : [{ month: 0, Hours: 0 }]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickFormatter={month => monthNames[month]} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Hours" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )} 
    </CardContent>
  </Card>
  );
};

export default BarChartGraph;