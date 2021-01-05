import React from 'react';

const Query = ({changeQuery, runQuery}):JSX.Element => {
    return <div className="item-container">
                <textarea style={{marginTop: "15px"}} rows={10} cols={50} onChange={(ev) => changeQuery(ev.target.value)}></textarea>
                <br></br>
                <h6 style={{marginTop: "15px"}}onClick={() => runQuery()} className="text-button">Run Query</h6>
            </div>
}

export default Query;