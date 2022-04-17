import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from "../slices/User"
import chatroom from "../slices/Chat"

const reducer = combineReducers({
  user,
  chatroom
})

const store = configureStore({
  reducer,    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;