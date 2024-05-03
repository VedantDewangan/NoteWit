import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import axios from "axios"
import toast from "react-hot-toast"

export const DeleteNoteComponent = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await axios.delete("http://localhost:3000/api/deleteNote",{
            params:{
                id:props.id
            }
        })
        if(data.delete){
            props.handleChangeVariable(true)
            toast.success(data.msg)
        }
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen}>
                <DeleteIcon />
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <form onSubmit={handleSubmit}>

                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme='red' type='submit' ml={3}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </form>
            </AlertDialog>
        </>
    )
}
