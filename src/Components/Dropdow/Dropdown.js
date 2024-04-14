import React, { useEffect, useRef } from 'react'

export default function Dropdown(props) {
    const dropdownRef = useRef();
    const handleClick = (e)=>{
        if (dropdownRef && !dropdownRef.current.contains(e.target)) {
            if (props.onClose)
             {
                props.onClose();
                console.log(!dropdownRef.current.contains(e.target));
            }
          }
    }
    useEffect(()=>{
        document.addEventListener('click', handleClick,  { capture: true })

        return ()=>{
            document.removeEventListener('click', handleClick, { capture: true })
        }
    })
  return (
    <div ref= {dropdownRef} className='dropdown'
    style={{
        position:"absolute",
        top: "100%",
        right: "0",
        zIndex: "10"
    }}
    >
        {props.children}
    </div>
  )
}
