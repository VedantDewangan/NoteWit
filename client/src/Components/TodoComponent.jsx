import React, { useEffect, useState } from 'react'
import { DeleteTaskComponent } from './DeleteTaskComponent'
import { Button, Kbd, Text } from '@chakra-ui/react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const TodoComponent = (props) => {

  const getMonth = (mon) => {
    switch (mon) {
      case 1:
        return 'Jan'
        break;
      case 2:
        return 'Feb'
        break;
      case 3:
        return 'Mar'
        break;
      case 4:
        return 'Apr'
        break;
      case 5:
        return 'May'
        break;
      case 6:
        return 'Jun'
        break;
      case 7:
        return 'Jul'
        break;
      case 8:
        return 'Aug'
        break;
      case 9:
        return 'Sep'
        break;
      case 10:
        return 'Oct'
        break;
      case 11:
        return 'Nov'
        break;
      case 12:
        return 'Dec'
        break;
      default:
        break;
    }
  }

  const getHrs = (hr) => {
    if (hr < 12) {
      return hr;
    }
    else if (hr === 12) {
      return `${12}`;
    }
    else {
      return hr % 12
    }
  }

  const AMPM = (hr) => {
    if (hr < 12) {
      return `AM`;
    }
    else if (hr === 12) {
      return `PM`;
    }
    else {
      return `PM`
    }
  }

  const getTimeLeft = () => {
    var a = new Date(props.deadTime) - new Date(Date.now());
    var year = Math.floor(a / (1000 * 60 * 60 * 24 * 365.25))
    var day = Math.floor(a / (1000 * 60 * 60 * 24))
    var hrs = Math.floor(a / (1000 * 60 * 60) % 24)
    var min = Math.floor(a / (1000 * 60) % 60)
    if (year <= 0 && day <= 0 && hrs <= 0 && min <= 0) {
      return null;
    }
    return `${year === 0 ? "" : `${year}Y`} ${day === 0 ? "" : `${day}D`} ${hrs === 0 ? "" : `${hrs}H`} ${min === 0 ? "" : `${min}M`}`;
  }

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (getTimeLeft() && !props.done) {
        setTimeLeft(getTimeLeft())
      }
      if (!getTimeLeft() && !props.done) {
        setTimeLeft("no time left")
      }
    }, 60000);

    if (props.done) {
      setTimeLeft("work is done")
    }
    else if (!getTimeLeft()) {
      setTimeLeft("no time left")
    }
    return () => clearInterval(intervalId);
  }, []);

  const handleClick = async () => {
    if (getTimeLeft()) {
      if (!props.done) {
        await axios.put("http://localhost:3000/api/editTask", {
          id: props.id
        })
        setTimeLeft("work is done")
        toast.success("Congo You Completed YOur Work on Time")
      }
      else {
        toast("Your work is already Done", { icon: '⚠️' })
      }
    }
    else {
      if (!props.done) {
        toast.error("No Time Left")
      }
      else {
        toast("Your work is already Done", { icon: '⚠️' })
      }
    }
    props.handleChange(true)
  }

  const GetTime = (time) => {
    return `${getMonth(parseInt(time.slice(5, 7)))} ${time.slice(8, 10)} ${time.slice(0, 4)} ${getHrs(parseInt(time.slice(11, 13)))}:${time.slice(14, 17)} ${AMPM(parseInt(time.slice(11, 13)))}`;
  }

  return (
    <>
      <div className='TodoComponent' style={{ backgroundColor: `${props.done ? "lightgreen" : getTimeLeft() ? "" : "lightpink"}` }} >
        <p style={{textDecoration:`${props.done?"line-through":""}`,fontSize:"x-large"}}>{props.task}</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "true", padding: "0px 10%" }}>
            <div>
              <Text fontWeight={550} >Dead Time</Text>
              <Kbd fontSize={'medium'}>{GetTime(`${props.deadTime}`)}</Kbd>
            </div>
            <div>
              <Text fontWeight={550} >Time Left</Text>
              <Kbd fontSize={'medium'} >{timeLeft}</Kbd>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "25px", padding: "25px 0px 10px 0px" }}>
            <div>
              STATUS : {props.done ? "DONE" : "NOT DONE"}
            </div>
            <div>
              <Button display={props.done?"none":getTimeLeft()?"":"none"} backgroundColor={"rgba(100, 149, 237, 0.6)"} padding={"8px"} onClick={handleClick}>Mark As Done</Button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "2px solid rgba(27, 27, 27, 0.5)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px 25px" }}>
          <p style={{ textAlign: "left", fontSize: "small" }}>
            {`${props.created.slice(4,15)} ${getHrs(parseInt(props.created.slice(16,18)))}:${props.created.slice(19,21)} ${AMPM(parseInt(props.created.slice(16,18)))}`}
          </p>
          <div style={{ display: "flex", gap: "10px", margin: "10px 10px 0px 10px" }}>
            <DeleteTaskComponent id={props.id} handleChange={props.handleChange} />
          </div>
        </div>
      </div>
    </>
  )
}