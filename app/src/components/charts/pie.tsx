import React from 'react';
import {Pie} from 'react-chartjs-2';

function PieChart({testData}):JSX.Element {
  const data: object = {
    labels: testData.labels,
    datasets: testData.datasets
  };
  return <Pie data={data}/>
}

export default PieChart;