import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import api from '../services/apiService'

interface User {
  name: string
}

interface Invoice {
  id: number
  amount: number
  due_date: string
  details: string
  user_id: number
  user: User
}

interface InvoicesState {
  invoices: Invoice[]
  selectedInvoice: Invoice | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: InvoicesState = {
  invoices: [],
  selectedInvoice: null,
  status: 'idle',
  error: null,
}

export const fetchInvoices = createAsyncThunk<
  Invoice[],
  void,
  { rejectValue: string }
>('invoices/fetchInvoices', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/invoices')
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to fetch invoices.')
  }
})

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    selectInvoice: (state, action: PayloadAction<Invoice | null>) => {
      state.selectedInvoice = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.invoices = action.payload
        state.error = null
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message ?? 'An error occurred'
      })
  },
})

export const { selectInvoice } = invoicesSlice.actions;

export const selectInvoices = (state: RootState) => state.invoices.invoices
export const selectSelectedInvoice = (state: RootState) =>
  state.invoices.selectedInvoice
export const selectInvoicesStatus = (state: RootState) => state.invoices.status

export default invoicesSlice.reducer
