import React from 'react';
import {Pie} from 'react-chartjs-2';

function PieChart({testData}):JSX.Element {
  const data: object = {
    labels: testData.labels,
    datasets: testData.datasets
  };
  return <div className="item-container" style={{marginLeft:"5px"}}>
    <Pie data={data} options={{
      legend: {
        display: false
      }
    }}/>
  </div> 
}

export default PieChart;