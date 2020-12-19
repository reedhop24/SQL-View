import React from 'react';
import XAxis from './breakdown/xAxis';
import YAxis from './breakdown/yAxis';
import BreakDownBy from './breakdown/breakdownBy';
import Generate from './breakdown/generate'

const BreakDown = ({breakdownVals, xAxis, yAxis, breakD, createTable}):JSX.Element => {
    return(
        <div>
            <XAxis setXAxis={(x) => xAxis(x)}  xAxis={breakdownVals}/>
            <YAxis setYAxis={(y) => yAxis(y)} yAxis={breakdownVals}/>
            <BreakDownBy setBreakdown={(b) => breakD(b)} breakdown={breakdownVals}/>
            <Generate generateChart={createTable}/>
        </div>
        );
}

export default BreakDown;