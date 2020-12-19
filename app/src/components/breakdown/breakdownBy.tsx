import React, {useState} from 'react';

const BreakDownBy = ({setBreakdown, breakdown}):JSX.Element => {
    const [currBreakdown, setCurrBreakdown] = useState('');
    // if(currBreakdown === '' && breakdown.length > 0) {
    //     setBreakdown(Object.entries(breakdown[0])[0][0]);
    // }
    return (
            <div id="select-table">
                <label htmlFor="x-axis">Break Down By : </label>
                <select name="x-axis" value={currBreakdown} onChange={(ev) => {
                    let selected = ev.target as HTMLSelectElement;
                    ev.preventDefault();
                    setBreakdown(selected.value);
                    setCurrBreakdown(selected.value);
                }}>
                    {breakdown.length > 0 ? Object.entries(breakdown[0]).map((x) => (
                        <option key={x[0]}>{x[0]}</option>
                    )) : null}
                </select>
            </div>)
}

export default BreakDownBy