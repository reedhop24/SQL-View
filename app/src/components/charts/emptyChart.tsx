import React from 'react';
import {Bar} from 'react-chartjs-2';

function EmptyChart({testData}):JSX.Element {
  
  const data: object = {};
  return <div className="item-container" style={{marginLeft:"5px"}}>
      <Bar data={data}/>
    </div>
}

export default EmptyChart;