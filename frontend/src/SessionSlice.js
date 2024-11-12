import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'sessions',
    initialState: {
        value: []
    },
    reducers: {
        updateSessions: (state, action) => {

            state.value = action.payload;
        }
    }

})

// Action creators are generated for each case reducer function
export const { updateSessions } = sessionSlice.actions

export default sessionSlice.reducer