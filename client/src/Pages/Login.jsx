import React, { useEffect, useState } from 'react'
import { Text, Input, InputGroup, Button, InputRightElement } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"

export const Login = () => {

  useEffect(()=>{
    if(localStorage.getItem("NoteWit")){
      navigate("/")
    }
  })

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const navigate = useNavigate();

  const [InputData, SetInputData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    SetInputData({
      ...InputData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:3000/api/login", InputData);
    if(data.login){
      localStorage.setItem("NoteWit",data.id)
      navigate("/");
    }
    else{
      toast.error(data.msg)
    }
  }

  return (
    <>
      <Text margin={"10vh auto 0px auto"} textAlign={'center'} fontSize='4xl' fontWeight={500}>Welcome Back!</Text>
      <Text margin={"2.5vh auto 2.5vh auto"} textAlign={'center'} fontSize='lg'>Please enter your credentials to access your notes</Text>
      <form className='Login-Signup-Form' onSubmit={handleSubmit} >
        <Input required placeholder='Enter Email' type='email' name="email" onChange={handleChange} size='md' autoComplete='off' />
        <InputGroup size='md'>
          <Input
            required
            name='password'
            onChange={handleChange}
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick} margin={"20px 0px 0px 0px"}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <p>Don't have Account? <Link to={"/signup"}>Sign Up</Link></p>
        <Button colorScheme='blue' type='submit' variant='solid' display={'block'} >
          Login
        </Button>
      </form>
    </>
  )
}
