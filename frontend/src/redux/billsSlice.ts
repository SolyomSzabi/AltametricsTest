import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import api from '../services/apiService';

interface User {
  name: string;
}

interface Bill {
  id: number;
  amount: number;
  due_date: string;
  details: string;
  user_id: number;
  user: User;
}

interface BillsState {
  bills: Bill[];
  selectedBill: Bill | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BillsState = {
  bills: [],
  selectedBill: null,
  status: 'idle',
  error: null,
};

export const fetchBills = createAsyncThunk<Bill[], void, { rejectValue: string }>(
  'bills/fetchBills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/bills');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch invoices.');
    }
  }
);

const billsSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    selectBill: (state, action: PayloadAction<Bill | null>) => {
      state.selectedBill = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bills = action.payload;
        state.selectedBill = null;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export const { selectBill } = billsSlice.actions;

export const selectBills = (state: RootState) => state.bills.bills;
export const selectSelectedBill = (state: RootState) => state.bills.selectedBill;
export const selectBillsStatus = (state: RootState) => state.bills.status;

export default billsSlice.reducer;
