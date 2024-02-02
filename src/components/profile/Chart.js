import React from 'react';
import { styled } from '@mui/material/styles';
import ApexChart from 'react-apexcharts';

const StyledChart = styled(ApexChart)({
  // Add styles here if necessary
});

const Chart = (props) => {
  // Define chart options and series here
  const options = {}; // Your chart configuration
  const series = [];  // Your data series

  return <StyledChart options={options} series={series} {...props} />;
};

export default Chart;
