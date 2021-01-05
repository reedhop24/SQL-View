import React, {useState} from 'react';

const BreakDownBy = ({setBreakdown, breakdown, label}):JSX.Element => {
    const [currBreakdown, setCurrBreakdown] = useState<string>('');;
    return (
            <div id="select-table" style={{textAlign:"left"}} className="breakdown">
                <label className="breakdown-label" htmlFor="breakdown">{label}</label>
                <select className="breakdown-input" name="breakdown" value={currBreakdown} onChange={(ev) => {
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