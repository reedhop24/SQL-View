import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const YAxis = ({setYAxis, yAxis}):JSX.Element => {
    const [currYAxis, setCurrYAxis] = useState('');
    // if(currYAxis === '' && yAxis.length > 0) {
    //     setYAxis(Object.entries(yAxis[0])[0][0]);
    // }
    return (
            <div id="select-table">
                <label htmlFor="x-axis">Y-Axis: </label>
                <select name="x-axis" value={currYAxis} onChange={(ev) => {
                    let selected = ev.target as HTMLSelectElement;
                    ev.preventDefault();
                    setYAxis(selected.value);
                    setCurrYAxis(selected.value);
                }}>
                    {yAxis.length > 0 ? Object.entries(yAxis[0]).map((x) => (
                        <option key={uuidv4()} value={x[0]}>{x[0]}</option>
                    )) : null}
                </select>
            </div>)
}

export default YAxis