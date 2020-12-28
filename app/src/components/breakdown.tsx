import React from 'react';
import BreakDownBy from './breakdown/breakdownBy';
import Generate from './breakdown/generate'

const BreakDown = ({breakdownVals, xAxis, yAxis, breakD, createTable}):JSX.Element => {
    return(
        <div>
            <BreakDownBy setBreakdown={(x) => xAxis(x)} breakdown={breakdownVals} label="X-Axis: "/>
            <BreakDownBy setBreakdown={(y) => yAxis(y)} breakdown={breakdownVals} label="Y-Axis: "/>
            <BreakDownBy setBreakdown={(b) => breakD(b)} breakdown={breakdownVals} label="Breakdown By: "/>
            <Generate generateChart={createTable}/>
        </div>
        );
}

export default BreakDown;