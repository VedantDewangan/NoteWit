import React, { useEffect, useState } from 'react'
import { LeftNavBarComponent } from '../Components/LeftNavBarComponent'
import { Input, IconButton, Text, CircularProgress } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons';
import img from "../Images/noteIMG.jpeg"
import { NoteComponent } from '../Components/NoteComponent';
import { AddNoteComponent } from '../Components/AddNoteComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select } from '@chakra-ui/react'

export const Note = () => {

  const navigate = useNavigate();
  const [Loading, SetLoading] = useState(false);
  const [AllNote, SetAllNote] = useState([]);
  const [change, SetChange] = useState(false);
  const [sortChange, SetSortChange] = useState("");
  const [Search, SetSearch] = useState("");

  const handleSearchChange = (e) => {
    SetSearch(e.target.value);
    if (Search === "" || Search.length === 1) {
      getAllNote();
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (Search === "") {
      getAllNote();
    } else {
      const filteredNotes = AllNote.filter((note) =>
        note.noteContent.includes(Search)
      );
      SetAllNote(filteredNotes);
    }
  };


  const handleChangeVariable = (data) => {
    SetChange(data);
  }

  useEffect(() => {
    if (!localStorage.getItem("NoteWit")) {
      navigate("/login");
    }
    else {
      getAllNote();
    }
  }, [change, sortChange])

  const getAllNote = async () => {
    const { data } = await axios.get("http://localhost:3000/api/getAllNotes", {
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
    SetAllNote(sortedItems);
    SetChange(false);
  }

  const handleChangeSort = (e) => {
    SetSortChange(e.target.value);
  }

  return (
    <>
      <main className="NotePage">
        <LeftNavBarComponent page="note" />
        {
          Loading ?
            <div style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress isIndeterminate color='blue.300' marginRight={"300px"} />
            </div>
            :
            <>
              <div className="RightNotePage">
                <div className="RightTop">
                  <form className='SearchFormNote' onSubmit={handleSearchSubmit}>
                    <Input placeholder='Search' size='md' autoComplete='off' onChange={handleSearchChange} />
                    <IconButton aria-label='Search database' icon={<SearchIcon />} type='submit' backgroundColor={'none'} />
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
                      Feel Free and Write Down Your Personal Notes Here
                    </Text>
                    <AddNoteComponent handleChangeVariable={handleChangeVariable} />
                  </div>
                  <div className="RightBottomLeft">
                    <Text>
                      My Notes
                    </Text>
                    <div className="NoteConatiner">
                      {AllNote.length === 0 ?
                        <p style={{ textAlign: "center", fontSize: "larger", width: "70%", margin: "auto", height: "100%", display: "flex", paddingBottom: "100px", alignItems: "center" }}>Unlock your voice. Take the leap. Let your thoughts dance online. Start your journey with your very first note on our website</p>
                        :
                        AllNote.map((note, i) => {
                          return (
                            <NoteComponent
                              handleChangeVariable={handleChangeVariable}
                              id={note._id}
                              Title={note.noteTitle}
                              Content={note.noteContent}
                              Time={note.noteCreated}
                              key={i} />
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </>
        }
      </main>
    </>
  )
}