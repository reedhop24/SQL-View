import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const XAxis = ({xAxis, setXAxis}):JSX.Element => {
    const [currXAxis, setCurrXAxis] = useState('');
    // if(currXAxis === '' && xAxis.length > 0) {
    //     setXAxis(Object.entries(xAxis[0])[0][0]);
    // }
    return (
            <div id="select-table">
                <label htmlFor="x-axis">X-Axis: </label>
                <select name="x-axis" value={currXAxis} onChange={(ev) => {
                    let selected = ev.target as HTMLSelectElement;
                    ev.preventDefault();
                    setXAxis(selected.value);
                    setCurrXAxis(selected.value);
                }}>
                    {xAxis.length > 0 ? Object.entries(xAxis[0]).map((x) => (
                        <option key={uuidv4()} value={x[0]}>{x[0]}</option>
                    )): null}
                </select>
            </div>)
}

export default XAxis

