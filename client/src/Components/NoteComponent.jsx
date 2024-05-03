import React from 'react'
import { DeleteNoteComponent } from './DeleteNoteComponent'
import { EditNoteComponent } from './EditNoteComponent'

export const NoteComponent = (props) => {

  if(parseInt(props.Time.slice(16,18))>12){
    var time = `${parseInt(props.Time.slice(16,18))%12}`;
    var AMPM = "PM"
  }
  else if(parseInt(props.Time.slice(16,18))===12){
    var time = `12`;
    var AMPM = "PM"
  }
  else{
    var time = `${parseInt(props.Time.slice(16,18))}`;
    var AMPM = "AM"
  }


  return (
    <>
      <div className='NoteComponent' >
        <p>{props.Title}</p>
        <p>{props.Content}</p>
        <div style={{ borderTop: "2px solid rgba(27, 27, 27, 0.5)",display:"flex",alignItems:"center",justifyContent:"space-between" ,padding:"0px 25px" }}>
          <p style={{ textAlign: "left", fontSize: "small" }}>
            {`${props.Time.slice(4,15)} ${time}${props.Time.slice(18,21)} ${AMPM}`}
          </p>
          <div style={{display:"flex",gap:"10px",margin:"10px 10px 10px 10px"}}>
            <DeleteNoteComponent id={props.id} handleChangeVariable={props.handleChangeVariable} />
            <EditNoteComponent id={props.id} handleChangeVariable={props.handleChangeVariable} />
          </div>
        </div>
      </div>
    </>
  )
}
