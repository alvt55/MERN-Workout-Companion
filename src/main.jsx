import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'

import '@mantine/core/styles.css';
import { MantineProvider, createTheme} from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultColorScheme: 'dark',
});


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <MantineProvider theme={theme} >
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </MantineProvider>

  /* // </React.StrictMode>, // prevents data persistance  */
)
