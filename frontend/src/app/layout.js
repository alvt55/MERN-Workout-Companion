'use client'

import { ChakraProvider, defaultSystem, Box } from '@chakra-ui/react';
import Navbar from './navbarpage/Navbar';
import './index.css'
import {inter} from '@/app/ui/fonts'


export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>



        <ChakraProvider value={defaultSystem}>

          <Box width="100%" m="0 auto" overflow="hidden" className={`${inter.className} antialiased`}>
          <Navbar />
          {children}
          </Box>
          

        </ChakraProvider>
      </body>
    </html>
  );
}
