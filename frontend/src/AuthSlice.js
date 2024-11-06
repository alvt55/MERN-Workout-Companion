import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false 
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true; 
    }, 

    logout: (state, action) => {
      state.loggedIn = false; 
    },


    
  }
})

// Action creators are generated for each case reducer function
export const { login, logout} = authSlice.actions

export default authSlice.reducer