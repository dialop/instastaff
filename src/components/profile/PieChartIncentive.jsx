import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666',
'#FFCC00', '#6699FF', '#66FF99', '#FF6666', '#CCFF66',
'#FF9933', '#FF6600', '#FF9966', '#99FF66', '#FF6666'];

const PieChartIncentive = () => {
  const [calendarData, setCalendarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setIsLoading(true);
        const userId = window.sessionStorage.getItem('userId');
        const response = await fetch(`/calendar/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch calendar data");
        const data = await response.json();
        setCalendarData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchCalendarData();
  }, []);

  // Aggregate hours per hospital
  const aggregateHospitalData = () => {
    const aggregatedData = {};
    if (calendarData) {
      calendarData.forEach(shift => {
        const facilityName = shift.facility_name;
        if (!aggregatedData[facilityName]) {
          aggregatedData[facilityName] = 0;
        }
        aggregatedData[facilityName] += shift.duration;
      });
    }
    return aggregatedData;
  };

  const formatDataForPieChart = () => {
    const aggregatedData = aggregateHospitalData();
    return Object.keys(aggregatedData).map((facilityName, index) => ({
      facilityName,
      duration: aggregatedData[facilityName],
      color: COLORS[index % COLORS.length]
    }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Total Hours Worked per Facility</Typography>
        {!isLoading && !error && formatDataForPieChart().length === 0 && 
          <div>Summary unavailable until your first accepted shift!</div>}
        {!isLoading && !error && (
          <ResponsiveContainer width="100%" height={275}>
            <PieChart>
              <Pie
                data={formatDataForPieChart()}
                dataKey="duration"
                nameKey="facilityName"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ duration }) => `${duration} hrs`}
              >
                {formatDataForPieChart().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PieChartIncentive;






// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// const data = [
//   { name: '?', value: 63 },
//   { name: '?', value: 15 },
//   { name: '?', value: 22 },
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// const PieChartIncentive = () => (
//   <Card>
//     <CardContent>
//       <Typography variant="h6">Health/Facility Summary</Typography>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </CardContent>
//   </Card>
// );

// export default PieChartIncentive;
