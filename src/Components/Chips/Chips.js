import React from 'react'
import "./Chips.css"
import {X} from 'react-feather'

export default function Chips(props) {
  return (
    <div className='chip' style={{backgroundColor: props.color}}>
        {props.text}
        {props.close && <X onClick={() => (props.onClose ? props.onClose() : "")}/>}
        

    </div>
  )
}
