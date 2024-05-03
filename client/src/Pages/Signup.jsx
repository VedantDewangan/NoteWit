import React, { useEffect, useState } from 'react'
import { Text, Input, InputGroup, Button, InputRightElement } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

export const Signup = () => {

  useEffect(()=>{
    if(localStorage.getItem("NoteWit")){
      navigate("/")
    } 
  })

  const [show1, setShow1] = React.useState(false)
  const handleClick1 = () => setShow1(!show1)
  const [show2, setShow2] = React.useState(false)
  const handleClick2 = () => setShow2(!show2)
  const navigate = useNavigate();

  const [InputData, SetInputData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:3000/api/register", InputData);
    if(data.register){
      localStorage.setItem("NoteWit",data.id);
      navigate("/")
    }
    else{
      toast.error(data.msg)
    }
  }

  const handleChange = (e) => {
    SetInputData({
      ...InputData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <Text margin={"10vh auto 0px auto"} textAlign={'center'} fontSize='4xl' fontWeight={500}>Create an Account</Text>
      <Text margin={"2.5vh auto 2.5vh auto"} textAlign={'center'} fontSize='lg'>Please fill out the form below to create your account</Text>
      <form className='Login-Signup-Form' onSubmit={handleSubmit}>
        <Input required placeholder='Enter Username' type='text' name='username' onChange={handleChange} size='md' autoComplete='off' />
        <Input required placeholder='Enter Email' type='email' name='email' onChange={handleChange} size='md' autoComplete='off' />

        <InputGroup size='md'>
          <Input
          required
          name='password'
          onChange={handleChange}
            pr='4.5rem'
            type={show1 ? 'text' : 'password'}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick1} margin={"20px 0px 0px 0px"}>
              {show1 ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup size='md'>
          <Input
          required
          name='confirm_password'
          onChange={handleChange}
            pr='4.5rem'
            type={show2 ? 'text' : 'password'}
            placeholder='Enter Confirm password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick2} margin={"20px 0px 0px 0px"}>
              {show2 ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <p>Already have Account? <Link to={"/login"}>Log In</Link></p>
        <Button colorScheme='blue' type='submit' variant='solid' display={'block'} >
          Create Account
        </Button>
      </form>
    </>
  )
}
