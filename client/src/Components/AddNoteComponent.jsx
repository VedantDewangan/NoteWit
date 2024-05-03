import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    Input,
    Textarea,
} from '@chakra-ui/react'
import axios from "axios"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"

export const AddNoteComponent = (props) => {

    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem("NoteWit")){
            navigate("/login")
        }
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [NoteInput,SetNoteInput] = useState({
        noteTitle:"",
        noteContent:"",
        userId:localStorage.getItem("NoteWit")
    })

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {data} = await axios.post("http://localhost:3000/api/addNote",NoteInput);
        if(data.add){
            props.handleChangeVariable(true)
            toast.success(data.msg)
        }
        onClose()
    }

    const handleChange = (e)=>{
        SetNoteInput({
            ...NoteInput,
            [e.target.name]:e.target.value
        })
    }

    return (
        <>
            <Button onClick={onOpen} title='Add Note'>
                +
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Add New Note
                        </AlertDialogHeader>

                       <form onSubmit={handleSubmit}>
                       <AlertDialogBody>
                            <Input autoComplete='off' placeholder='Enter Note Title' required name='noteTitle' maxLength={50} onChange={handleChange} />
                            <Textarea margin={'25px 0px 0px 0px'} placeholder='Enter Note' required name='noteContent' minLength={100} maxLength={408} rows={13} onChange={handleChange} />
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='green' ml={3} type='submit'>
                                Add
                            </Button>
                        </AlertDialogFooter>
                       </form>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
