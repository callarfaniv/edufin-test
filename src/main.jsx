import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <App />
        <Footer />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
