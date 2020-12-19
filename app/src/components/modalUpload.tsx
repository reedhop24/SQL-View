import React from 'react';

const ModalUpload = ():JSX.Element => {
    return (
        <div id="file-modal" className="modal" >
            <p>Choose a CSV file:</p>
            <p><input type="file" id="upload" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/></p>
            <a href="/#" rel="modal:close" className="modal-button">Cancel</a>
            <a href="/#" className="modal-button" rel="modal:close" id="save">Save</a>
        </div>
    );
  }


  export default ModalUpload;