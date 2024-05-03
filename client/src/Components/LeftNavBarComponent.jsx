import React from 'react'
import {Link} from "react-router-dom"

export const LeftNavBarComponent = (props) => {
  return (
    <>
    <ul className='LeftNavBar'>
        <li style={{backgroundColor:`${props.page==="home"?"rgb(20, 147, 221)":"lightgrey"}`}}>
            <Link  style={{color:`${props.page==="home"?"whitesmoke":"black"}`}} to={"/"} >HOME</Link>
        </li>
        <li style={{backgroundColor:`${props.page==="note"?"rgb(20, 147, 221)":"lightgrey"}`}}>
            <Link  style={{color:`${props.page==="note"?"whitesmoke":"black"}`}} to={"/note"} >NOTE</Link>
        </li>
        <li style={{backgroundColor:`${props.page==="task"?"rgb(20, 147, 221)":"lightgrey"}`}}>
            <Link  style={{color:`${props.page==="task"?"whitesmoke":"black"}`}} to={"/task"} >TASK</Link>
        </li>
    </ul>
    </>
  )
}
