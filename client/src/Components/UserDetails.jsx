import { Box, FormLabel, Input, Button, FormControl, InputGroup, InputRightElement, Text,CircularProgress } from '@chakra-ui/react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast"

export const UserDetails = () => {

  const [TotalTask, SetTotalTask] = useState(0);
  const [TotalTaskDone, SetTotalTaskDone] = useState(0);
  const [percent, SetPercent] = useState(0);
  const [Loading,SetLoading] = useState(false);

  useEffect(() => {
    const getAllTask = async () => {
      var count = 0;
      SetLoading(true)
      const { data } = await axios.get("http://localhost:3000/api/getAllTask", {
        params: {
          id: localStorage.getItem("NoteWit")
        }
      })
      data.forEach((task) => {
        console.log(task);
        if (task.Done) {
          count++;
        }
      })
      SetLoading(false);
      SetTotalTaskDone(count);
      SetTotalTask(data.length);
      SetPercent(Math.floor((count / data.length) * 100));
    }
    const getUserData = async () => {
      SetLoading(true);
      const { data } = await axios.get(`http://localhost:3000/api/getUserData?id=${localStorage.getItem("NoteWit")}`);
      SetUserData(data);
      SetLoading(false);
    }
    getUserData();
    getAllTask();
  }, [])

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [show1, setShow1] = React.useState(false)
  const handleClick1 = () => setShow1(!show1)
  const [show2, setShow2] = React.useState(false)
  const handleClick2 = () => setShow2(!show2)
  const [userData, SetUserData] = useState();
  const [changePassword, SetChangePassword] = useState(false)
  const [verify, SetVerify] = useState(false);

  const [checkPerviousPassword, SetCheckPerviousPassword] = useState();

  const VerifyPassword = async (e) => {
    e.preventDefault();

    const { data } = await axios.get(`http://localhost:3000/api/verifyPassword?id=${localStorage.getItem("NoteWit")}&password=${checkPerviousPassword}`)
    if (data.verified) {
      SetVerify(false);
      SetChangePassword(true)
    }
    else {
      toast.error("Incorrect Password")
    }
  }

  const [NewPassword, SetNewPassword] = useState("");
  const [NewConfirmPassword, SetNewConfirmPassword] = useState("");

  const ChangeUserPassword = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(`http://localhost:3000/api/changePassword`, {
      id: localStorage.getItem("NoteWit"),
      password: NewPassword,
      confirm_password: NewConfirmPassword
    })
    if (data.change) {
      toast.success(data.msg)
      SetChangePassword(false)
      SetVerify(false)
    }
    else {
      toast.error(data.msg)
    }
  }

  return (
    <>
      {Loading?
      <div style={{height:"100vh",width:"100vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <CircularProgress isIndeterminate color='blue.300' marginRight={"300px"} />
      </div>
      :
      userData ?
        <Box opacity={0.80} display={'flex'} flexDirection={'column'} padding={"80px 100px"} >
          <FormLabel padding={"0px 20px"}>
            Registered Name
          </FormLabel>
          <Input readOnly value={`${userData.username}`} />
          <FormLabel padding={"10px 20px 0px 20px"}>
            Registered Email
          </FormLabel>
          <Input readOnly value={`${userData.email}`} />
          <Button margin={"35px auto"} width={"60%"} display={`${!changePassword && !verify ? "block" : "none"}`} onClick={() => { SetVerify(true) }} >Change Password</Button>

          <Box display={`${!changePassword && verify ? "block" : "none"}`} >
            <form onSubmit={VerifyPassword}>
              <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} padding={'25px 0px 0px 0px'} >
                <FormLabel>
                  Enter Current Password
                </FormLabel>
                <InputGroup size='md' width={"50%"}>
                  <Input
                    onChange={(e) => { SetCheckPerviousPassword(e.target.value) }}
                    required
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button type='submit' margin={"15px 0px"} >Verify</Button>
              </FormControl>
            </form>
          </Box>

          <Box display={`${changePassword && !verify ? "block" : "none"}`} >
            <form onSubmit={ChangeUserPassword}>
              <FormControl display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} padding={'25px 0px 0px 0px'}>
                <FormLabel>
                  Enter New Password
                </FormLabel>
                <InputGroup size='md' width={"50%"}>
                  <Input
                    onChange={(e) => { SetNewPassword(e.target.value) }}
                    required
                    pr='4.5rem'
                    type={show1 ? 'text' : 'password'}
                    placeholder='Enter New password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick1}>
                      {show1 ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormLabel>
                  Enter Confirm Password
                </FormLabel>
                <InputGroup size='md' width={"50%"}>
                  <Input
                    id='confirm_password'
                    onChange={(e) => { SetNewConfirmPassword(e.target.value) }}
                    required
                    pr='4.5rem'
                    type={show2 ? 'text' : 'password'}
                    placeholder='Enter New Confirm password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick2}>
                      {show2 ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button margin={"20px auto"} display={'block'} type='submit'>Update Password</Button>
              </FormControl>
            </form>
          </Box>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} marginTop={10} justifyContent={'center'}>
            <Text fontSize={"large"} padding={"0px 0px 15px 0px"}>Total Number of Task : {TotalTask}</Text>
            <Text fontSize={"large"} padding={"0px 0px 15px 0px"}>Total Task Completed : {TotalTaskDone}</Text>
            <div style={{ width: '250px', height: '250px' }}>
              <CircularProgressbar value={percent} text={`${percent}%`} />
            </div>
          </Box>
        </Box>
        : null}
    </>
  )
}
