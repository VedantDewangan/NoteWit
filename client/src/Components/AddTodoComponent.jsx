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
import { useNavigate } from "react-router-dom"

export const AddTodoComponent = (props) => {

    const navigate = useNavigate();

    const [Loading, SetLoading] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("NoteWit")) {
            navigate("/login")
        }
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [TodoInput, SetTodoInput] = useState({
        Task: "",
        deadTime: "",
        userId: localStorage.getItem("NoteWit")
    })

    const istOffset = 330;
    const istTime = new Date(Date.now() + istOffset * 60000).toISOString().slice(0, -8);

    const handleSubmit = async (e) => {
        e.preventDefault();
        SetLoading(false);
        const { data } = await axios.post("http://localhost:3000/api/addTask", TodoInput);
        if (data.add) {
            toast.success(data.msg);
            props.handleChange(true)
            onClose();
        }
        else {
            toast.error(data.msg);
        }
        SetLoading(false);
    }

    const handleChange = (e) => {
        SetTodoInput({
            ...TodoInput,
            [e.target.name]: e.target.value
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
                            Add New Task
                        </AlertDialogHeader>

                        <form onSubmit={handleSubmit}>
                            <AlertDialogBody style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <Input autoComplete='off' placeholder='Enter Note Title' required name='Task' maxLength={50} onChange={handleChange} />
                                <Input
                                    required
                                    onChange={handleChange}
                                    name='deadTime'
                                    type='datetime-local'
                                    min={istTime}
                                    dateformat="MM/dd/yyyy"
                                />
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                {Loading ?
                                    <Button colorScheme='green' isLoading ml={3} type='submit'>
                                        Add
                                    </Button>
                                    :
                                    <Button colorScheme='green' ml={3} type='submit'>
                                        Add
                                    </Button>
                                }
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
