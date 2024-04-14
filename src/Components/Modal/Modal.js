// import React from 'react'
// import "./Modal.css"

// function Modal(props) {
//   return (
//     <div 
//         className='modalOut'
//         onClick={()=> props.onClose? props.onClose():""}
//         >
//         <div 
//             className='modal_content custom-scroll'
//             onClick={(e)=>e.stopPropagation()}          
//         >
//             {props.children}
//         </div>
//     </div>
//   )
// }

// export default Modal

import React from 'react';
import "./Modal.css";

function Modal(props) {
  return (
    <div
      className='modalOut'
      onClick={() => props.onClose ? props.onClose() : ""}
    >
      <div
        className='modal_content custom-scroll modal-dialog modal-dialog-centered'
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={props.onClose}></button>
          </div>
          <div className="modal-body">
            {props.children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary m-3" onClick={props.onClose}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
