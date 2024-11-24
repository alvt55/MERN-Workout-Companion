'use client'

import { ChakraProvider, defaultSystem, Box } from '@chakra-ui/react';
import Navbar from './navbarpage/Navbar';
import './index.css'


export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>



        <ChakraProvider value={defaultSystem}>

          <Box width="100%" m="0 auto" overflow="hidden">
          <Navbar />
          {children}
          </Box>
          

        </ChakraProvider>
      </body>
    </html>
  );
}
