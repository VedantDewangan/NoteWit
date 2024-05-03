import React from 'react'
import { LeftNavBarComponent } from '../Components/LeftNavBarComponent'
import { LogoutComponent } from "../Components/LogoutComponent"
import { UserDetails } from '../Components/UserDetails'
import { Box } from '@chakra-ui/react'

export const Home = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <LeftNavBarComponent page="home" />
        <div className="RightHomePage" style={{ height: "100vh", width: "92vw" }}>
          <Box >
            <UserDetails />
          </Box>
          <LogoutComponent />
        </div>
      </div>
    </>
  )
}
