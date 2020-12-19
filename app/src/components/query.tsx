import React from 'react';

const Query = ({changeQuery, runQuery}):JSX.Element => {
    return <div className="text-container">
                <textarea rows={10} cols={55} onChange={(ev) => changeQuery(ev.target.value)}></textarea>
                <h6 onClick={() => runQuery()} className="text-button">Run Query</h6>
            </div>
}

export default Query;