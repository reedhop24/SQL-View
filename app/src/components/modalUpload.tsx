import React from 'react';

const ModalUpload = ():JSX.Element => {
    return (
        <div id="file-modal" className="modal">
            <p>
                <h4>Choose a CSV file:</h4>
            </p>
            <p>
                <label htmlFor="upload" className="custom-file-upload">
                    <i className="fa fa-cloud-upload"></i> Choose File
                </label>
                <input type="file" id="upload" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            </p>
            <a href="/#" rel="modal:close" className="modal-button"><h6>Cancel</h6></a>
            <a href="/#" className="modal-button" rel="modal:close" id="save"><h6>Save</h6></a>
        </div>
    );
  }


  export default ModalUpload;