'use client'

import  {ChakraProvider, defaultSystem, createSystem, extendTheme, defineConfig}  from '@chakra-ui/react';
import Navbar from './navbarpage/Navbar';
import '../index.css';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
   
      <body>
   


      <ChakraProvider value={defaultSystem}>
          <Navbar />
          {children}
        
    </ChakraProvider>
      </body>
    </html>
  );
}
