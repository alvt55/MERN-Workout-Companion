import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    date: "",
    day: "",
    exercises: [],
    addOrRemove: false 
    
  },
  reducers: {
    updateDate: (state, action) => {
      state.date = action.payload
    }, 

    updateDay: (state, action) => {
      state.day = action.payload
    },

    addNewExercise: (state, action) => {
        state.exercises.push(action.payload)
    },

    resetExerciseList: state => {
      state.exercises = []
    },

    updateAddOrRemove: state => {
      state.addOrRemove = !state.addOrRemove
    }

    
  }
})

// Action creators are generated for each case reducer function
export const { updateDay, updateDate, addNewExercise, resetExerciseList, updateAddOrRemove} = sessionSlice.actions

export default sessionSlice.reducer