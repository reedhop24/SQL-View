import React from 'react';
import {Line} from 'react-chartjs-2';

function LineChart({testData}):JSX.Element {
  const data: object = {
    labels: testData.labels,
    datasets: testData.datasets
  };
  return <div className="item-container" style={{marginLeft:"5px"}}>
      <Line data={data} options={{
        responsive: true,
        maintainAspectRatio: true,
      }}/>
    </div>
}

export default LineChart;