import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './SessionSlice'
import authReducer from './AuthSlice'

export default configureStore({
    reducer: {
        session: sessionReducer,
        auth: authReducer 
    }
})


