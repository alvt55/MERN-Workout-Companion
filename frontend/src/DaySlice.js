import { createSlice } from '@reduxjs/toolkit'

export const daySlice = createSlice({
  name: 'day',
  initialState: {
    value: ""
  },
  reducers: {
    updateDay: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateDay } = daySlice.actions

export default daySlice.reducer