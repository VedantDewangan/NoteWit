import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import {Toaster} from "react-hot-toast"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ChakraProvider>
      <App />
    </ChakraProvider>
    <Toaster  position="top-right"/>

  </>,
)
