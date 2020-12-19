import React from 'react';
import '../App.css';
import {v4 as uuidv4} from 'uuid';

const TableSelect = ({tableOptions, selectTable, currentTable}):JSX.Element => {
    tableOptions = tableOptions.reverse();
    return <div id="select-table">
                <label htmlFor="tables">Choose a Table: </label>
                <select name="tables" id="tables" value={currentTable} onChange={(ev) => {
                    let selected = ev.target as HTMLSelectElement;
                    ev.preventDefault();
                    selectTable(selected.value)}
                }>
                    {tableOptions.map(table => (
                        <option value={table} key={uuidv4()}>{table}</option>
                    ))}
                </select>
            </div>
}

export default TableSelect;