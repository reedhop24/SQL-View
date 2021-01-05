import React from 'react';
import {Bar} from 'react-chartjs-2';

function BarChart({testData}):JSX.Element {
  const data: object = {
    labels: testData.labels,
    datasets: testData.datasets
  }
  ;
  return <div className="chart item-container" style={{marginLeft:"5px"}}>
      <Bar data={data} options={{
        legend: {
        display: false
      }}}/>
    </div>
}


export default BarChart;