import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './SessionSlice'

export default configureStore({
    reducer: {
        session: sessionReducer
        
    }
})


