import React from 'react'
import "./Modal.css"

function Modal(props) {
  return (
    <div 
        className='modalOut'
        onClick={()=> props.onClose? props.onClose():""}
        >
        <div 
            className='modal_content custom-scroll'
            onClick={(e)=>e.stopPropagation()}          
        >
            {props.children}
        </div>
    </div>
  )
}

export default Modal