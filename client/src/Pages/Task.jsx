import React, { useEffect, useState } from 'react'
import { LeftNavBarComponent } from '../Components/LeftNavBarComponent'
import { Input, IconButton, Text, Select, CircularProgress } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import img from "../Images/taskIMG.jpeg"
import { TodoComponent } from '../Components/TodoComponent';
import { AddTodoComponent } from '../Components/AddTodoComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Task = () => {

  const navigate = useNavigate();
  const [AllTask, SetAllTask] = useState([]);
  const [change, SetChange] = useState(false);
  const [sortChange, SetSortChange] = useState("");

  const handleChange = () => {
    SetChange(true);
  }

  useEffect(() => {
    if (!localStorage.getItem("NoteWit")) {
      navigate("/login")
    }
    else {
      getAllTask();
    }
  }, [change, sortChange])

  const getAllTask = async () => {
    const { data } = await axios.get("http://localhost:3000/api/getAllTask", {
      params: {
        id: localStorage.getItem("NoteWit")
      }
    })
    const sortedItems = data.reverse();
    if (sortChange === "option1") {
      const sortedItems = data;
    }
    else if (sortChange === "option2") {
      const sortedItems = data.reverse();
    }
    SetAllTask(sortedItems);
    SetChange(false);
  }

  const handleChangeSort = (e) => {
    SetSortChange(e.target.value);
  }

  return (
    <>
      <main className="NotePage">
        <LeftNavBarComponent page="task" />

        <div className="RightNotePage">
          <div className="RightTop">
            <form className='SearchFormNote'>
              <Input placeholder='Search' size='md' />
              <IconButton aria-label='Search database' icon={<SearchIcon />} backgroundColor={'none'} />
              <Select maxWidth={"15%"} placeholder='Sort By' onChange={handleChangeSort}>
                <option value='option1'>Latest First</option>
                <option value='option2'>Oldest First</option>
              </Select>
            </form>
          </div>
          <div className="RightBottom">
            <div className="RightBottomRight">
              <img src={img} alt="" />
              <Text>
                Add Your Task And Push Your Skills
              </Text>
              <AddTodoComponent handleChange={handleChange} />
            </div>
            <div className="RightBottomLeft">
              <Text>
                My Task
              </Text>
              <div className="NoteConatiner">
                {AllTask.length === 0 ?
                  <p style={{ textAlign: "center", fontSize: "larger", width: "70%", margin: "auto", height: "100%", display: "flex", paddingBottom: "100px", alignItems: "center" }}>Unlock your potential. Take the leap. Let your tasks dance online. Start your journey with your very first task on our website</p>
                  :
                  AllTask.map((task, i) => {
                    return (
                      <TodoComponent
                        id={task._id}
                        task={task.Task}
                        deadTime={task.DeadTime}
                        done={task.Done}
                        created={task.TaskCreated}
                        handleChange={handleChange}
                        key={i} />
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
