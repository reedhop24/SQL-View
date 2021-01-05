import React from 'react';

const Options = ({changeChart, current}):JSX.Element => {
    const styleOptions: object = {
        'Line': 'chart-type',
        'Bar': 'chart-type',
        'Pie': 'chart-type'
    }
    if(styleOptions[current] !== undefined) {
        styleOptions[current] = 'black-option chart-type'
    }
    return(
    <div className="options-container" onClick={(ev) => {
        let check = ev.target as HTMLTextAreaElement;
        if(check.id !== '') {
            changeChart(check.id);
        }
    }}>
        <h6 id="Line" className={styleOptions['Line']}>Line</h6>
        <h6 id="Bar" className={styleOptions['Bar']}>Bar</h6>
        <h6 id="Pie" className={styleOptions['Pie']}>Pie</h6>
    </div>)
}

export default Options;