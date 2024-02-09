import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './helpers/taskSlice'

export const store = configureStore({
  reducer: {
    tasks:todoReducer,
  },
})