import React from 'react';
import {Line} from 'react-chartjs-2';

function LineChart({testData}):JSX.Element {
  const data = {
    labels: testData.labels,
    datasets: testData.datasets
  };
  return <Line data={data}/>
}

export default LineChart;