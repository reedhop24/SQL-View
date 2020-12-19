import React from 'react';

const Generate = ({generateChart}):JSX.Element => {
    return <h6 onClick={() => generateChart()}>Generate Chart</h6>
}

export default Generate;