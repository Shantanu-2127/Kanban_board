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
    <div className='modalOut' onClick={() => props.onClose ? props.onClose() : ""}>
      <div className='modal_content custom-scroll' onClick={(e) => e.stopPropagation()}>
        {props.children}
        <div className="modal_buttons_container">
          <button className="btn btn-secondary" onClick={() => props.onClose ? props.onClose() : ""}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;




