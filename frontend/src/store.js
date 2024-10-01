import { configureStore } from '@reduxjs/toolkit'
import dayReducer from './DaySlice'

export default configureStore({
    reducer: {
        day: dayReducer
    }
})


