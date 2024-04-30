import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import SessionFirst from './SessionFirst/SessionFirst'
import Exercises from './Exercises/Exercises'
import './index.css'

function App() {
 

  return (
    // delete break later 
    <> 
      <SessionFirst></SessionFirst> 
      <Exercises></Exercises>
      
    </>
  ); 
}

export default App
