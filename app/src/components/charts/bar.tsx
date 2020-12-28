import React from 'react';
import {Bar} from 'react-chartjs-2';

function BarChart({testData}):JSX.Element {
  const data: object = {
    labels: testData.labels,
    datasets: testData.datasets
  };
  return <Bar data={data}/>
}

export default BarChart;