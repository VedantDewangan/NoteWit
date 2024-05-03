import React, { useState } from 'react'
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
    Textarea
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import axios from "axios"
import toast from "react-hot-toast"

export const EditNoteComponent = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const [InputEditData, SetInputEditData] = useState({
        newNoteTitle: "",
        newNoteContent: "",
        noteId: props.id
    })

    const handleChange = (e) => {
        SetInputEditData({
            ...InputEditData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await axios.put("http://localhost:3000/api/editNote",InputEditData);
        if(data.edit){
            props.handleChangeVariable(true)
            toast.success(data.msg);
        }
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen}>
                <EditIcon />
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Edit Your Note
                        </AlertDialogHeader>

                        <form onSubmit={handleSubmit}>
                            <AlertDialogBody>
                                <Input autoComplete='off' placeholder='Enter New Note Title' required name='newNoteTitle' maxLength={50} onChange={handleChange} />
                                <Textarea margin={'25px 0px 0px 0px'} placeholder='Enter New Note' required name='newNoteContent' minLength={100} maxLength={408} rows={13} onChange={handleChange} />
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='blue' type='submit' ml={3}>
                                    Edit
                                </Button>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
