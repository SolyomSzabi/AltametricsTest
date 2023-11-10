import { configureStore } from '@reduxjs/toolkit'
import invoicesReducer from './invoicesSlice'
import billsReducer from './billsSlice'

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    bills: billsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
